#!/bin/bash
# Subir schema.sql a GitHub Gist
cd /root/grenoucerie-crm

# Crear gist con el contenido
CONTENT=$(cat supabase-schema.sql)

# Usar gh api para crear gist
echo "$CONTENT" | gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /gists \
  -f "description=GRENOUCERIE CRM - Supabase Database Schema" \
  -f "public=false" \
  -F "files[supabase-schema.sql]=$CONTENT" 2>&1
