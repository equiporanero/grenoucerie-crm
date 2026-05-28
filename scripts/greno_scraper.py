#!/usr/bin/env python3
"""
GRENOUCERIE CRM — Scraper de Distribuidores Francés
Busca distribuidores de alimentos/fruits de mer/HORECA en Francia
y los inserta en la base de datos Supabase.
"""

import json
import time
import urllib.request
import urllib.parse
import os
from datetime import datetime

# Configuración
SUPABASE_URL = "https://iveyofwlpqtohxvxvvrp.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")

# Fuentes de scraping
SOURCES = {
    "societe.com": "https://www.societe.com/cgi-bin/search?champs={query}",
    "infogreffe": "https://www.infogreffe.fr/entreprises/{siren}",
    "pagesjaunes": "https://www.pagesjaunes.fr/annuaire/chercherlespros?quoiqui={query}&ou={region}",
}

# Términos de búsqueda para distribuidores de alimentos en Francia
SEARCH_QUERIES = [
    "distributeur alimentaire restaurant",
    "grossiste fruits de mer",
    "distributeur HORECA",
    "fournisseur restaurant",
    "importateur alimentaire exotique",
    "distributeur produits asiatiques",
    "grossiste alimentaire",
    "distributeur surgelés",
]

REGIONES_FRANCIA = [
    "Île-de-France",
    "Provence-Alpes-Côte d'Azur",
    "Auvergne-Rhône-Alpes",
    "Nouvelle-Aquitaine", 
    "Occitanie",
    "Hauts-de-France",
    "Grand Est",
    "Pays de la Loire",
    "Bretagne",
    "Normandie",
]


def search_distributors_firecrawl(query: str, region: str = "") -> list:
    """
    Usa Firecrawl API para buscar distribuidores.
    """
    if not os.getenv("FIRECRAWL_API_KEY"):
        print("⚠️  Firecrawl API key no configurada")
        return []
    
    search_query = f"{query} France distributeur alimentaire"
    if region:
        search_query += f" {region}"
    
    url = "https://api.firecrawl.dev/v1/scrape"
    payload = json.dumps({
        "url": f"https://www.google.com/search?q={urllib.parse.quote(search_query)}",
        "formats": ["markdown"],
        "onlyMainContent": True,
    }).encode()
    
    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Authorization": f"Bearer {os.getenv('FIRECRAWL_API_KEY')}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        data = json.loads(resp.read())
        content = data.get("data", {}).get("markdown", "")
        # Parsear resultados (simplificado)
        print(f"  📄 Firecrawl response: {len(content)} chars")
        return parse_firecrawl_results(content)
    except Exception as e:
        print(f"  ❌ Firecrawl error: {e}")
        return []


def parse_firecrawl_results(content: str) -> list:
    """Parsear resultados de Firecrawl para extraer datos de empresas."""
    distributors = []
    lines = content.split("\n")
    
    for line in lines:
        line = line.strip()
        if line and ("SARL" in line or "SAS" in line or "EURL" in line or "distributeur" in line.lower()):
            # Extraer nombre de empresa
            name = line.split("-")[0].strip() if "-" in line else line[:80]
            distributors.append({
                "company_name": name,
                "source": "firecrawl",
                "raw_text": line[:200],
                "status": "pending",
            })
    
    return distributors[:10]  # Máximo 10 resultados


def insert_distributor_supabase(distributor: dict) -> bool:
    """Insertar un distribuidor en Supabase."""
    if not SUPABASE_KEY:
        print("  ⚠️  Supabase key no configurada")
        return False
    
    payload = json.dumps({
        "name": distributor.get("company_name", "Sin nombre"),
        "company_name": distributor.get("company_name"),
        "siret": distributor.get("siret"),
        "address": distributor.get("address"),
        "city": distributor.get("city"),
        "postal_code": distributor.get("postal_code"),
        "phone": distributor.get("phone"),
        "email": distributor.get("email"),
        "website": distributor.get("website"),
        "source": distributor.get("source", "scraping"),
        "status": "pending",
        "tags": distributor.get("tags", []),
        "notes": distributor.get("raw_text", ""),
        "scraped_at": datetime.utcnow().isoformat(),
    }).encode()
    
    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/scraping_data",
        data=payload,
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
        method="POST",
    )
    
    try:
        resp = urllib.request.urlopen(req, timeout=10)
        return resp.status == 201
    except Exception as e:
        print(f"  ❌ Supabase insert error: {e}")
        return False


def scrape_all():
    """Ejecutar scraping completo de distribuidores."""
    print("🕷️  GRENOUCERIE CRM — Scraper de Distribuidores")
    print(f"⏰ {datetime.utcnow().isoformat()}")
    print(f"🔥 FIRECRAWL_API_KEY: {'✅' if os.getenv('FIRECRAWL_API_KEY') else '❌'}")
    print(f"🗄️  SUPABASE_KEY: {'✅' if SUPABASE_KEY else '❌'}")
    print()
    
    total_found = 0
    total_inserted = 0
    
    for region in REGIONES_FRANCIA[:3]:  # Solo primeras 3 regiones para demo
        print(f"📍 Región: {region}")
        
        for query in SEARCH_QUERIES[:3]:  # Solo primeros 3 queries
            print(f"  🔍 Buscando: {query}...")
            
            results = search_distributors_firecrawl(query, region)
            total_found += len(results)
            
            for dist in results:
                success = insert_distributor_supabase(dist)
                if success:
                    total_inserted += 1
                    print(f"    ✅ Insertado: {dist.get('company_name', 'N/A')[:50]}")
            
            time.sleep(1)  # Rate limiting
    
    print()
    print(f"📊 Resultados: {total_found} encontrados, {total_inserted} insertados")
    return total_found, total_inserted


def generate_outreach_email(distributor: dict) -> str:
    """Generar email de outreach personalizado."""
    name = distributor.get("company_name", "Distribuidor")
    region = distributor.get("region", "Francia")
    
    email = f"""Objet: Partnership GRENOUCERIE — Produits de la Mer du Vietnam

Bonjour {name},

Je me permets de vous contacter car nous sommes GRENOUCERIE, 
spécialiste de l'importation de cuisses de grenouille du Vietnam 
et de produits premiums de la mer.

Nous cherchons des partenaires distributeurs en {region} 
pour développer notre réseau en France.

Nos produits :
• Cuisses de grenouille Vietnam (70% de notre catalogue)
• Ligne Premium Esculenta (cuisses sélectionnées)
• Produits dérivés (terrines, rillettes)

Seriez-vous disponible pour un échange de 15 minutes 
cette semaine ?

Bien cordialement,
Équipe GRENOUCERIE
"""
    return email


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="GRENOUCERIE Scraper")
    parser.add_argument("--scrape", action="store_true", help="Ejecutar scraping")
    parser.add_argument("--email", type=str, help="Generar email para un distribuidor")
    parser.add_argument("--report", action="store_true", help="Generar reporte")
    
    args = parser.parse_args()
    
    if args.scrape:
        scrape_all()
    elif args.email:
        print(generate_outreach_email({"company_name": args.email, "region": "France"}))
    elif args.report:
        print("📊 Reporte de scraping pendiente (requiere conexión Supabase)")
    else:
        print("Uso: python greno_scraper.py --scrape | --email [nombre] | --report")
