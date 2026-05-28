"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MigrateServerlessTriggersToServerless1769532887284", {
    enumerable: true,
    get: function() {
        return MigrateServerlessTriggersToServerless1769532887284;
    }
});
let MigrateServerlessTriggersToServerless1769532887284 = class MigrateServerlessTriggersToServerless1769532887284 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "cronTriggerSettings" jsonb`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "databaseEventTriggerSettings" jsonb`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "httpRouteTriggerSettings" jsonb`);
        await queryRunner.query(`DROP TABLE IF EXISTS "core"."cronTrigger" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "core"."databaseEventTrigger" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "core"."routeTrigger" CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "httpRouteTriggerSettings"`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "databaseEventTriggerSettings"`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "cronTriggerSettings"`);
        await queryRunner.query(`
        CREATE TABLE "core"."cronTrigger" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "settings" jsonb NOT NULL,
          "serverlessFunctionId" uuid NOT NULL,
          "workspaceId" uuid NOT NULL,
          "universalIdentifier" uuid NOT NULL,
          "applicationId" uuid NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          CONSTRAINT "PK_cronTrigger" PRIMARY KEY ("id")
        )
      `);
        await queryRunner.query(`
        CREATE TABLE "core"."databaseEventTrigger" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "settings" jsonb NOT NULL,
          "serverlessFunctionId" uuid NOT NULL,
          "workspaceId" uuid NOT NULL,
          "universalIdentifier" uuid NOT NULL,
          "applicationId" uuid NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          CONSTRAINT "PK_databaseEventTrigger" PRIMARY KEY ("id")
        )
      `);
        await queryRunner.query(`
        CREATE TABLE "core"."routeTrigger" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "path" character varying NOT NULL,
          "isAuthRequired" boolean NOT NULL DEFAULT true,
          "httpMethod" character varying NOT NULL DEFAULT 'GET',
          "forwardedRequestHeaders" jsonb NOT NULL DEFAULT '[]',
          "serverlessFunctionId" uuid NOT NULL,
          "workspaceId" uuid NOT NULL,
          "universalIdentifier" uuid NOT NULL,
          "applicationId" uuid NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          CONSTRAINT "PK_routeTrigger" PRIMARY KEY ("id")
        )
      `);
    }
    constructor(){
        this.name = 'MigrateServerlessTriggersToServerless1769532887284';
    }
};

//# sourceMappingURL=1769532887284-migrateServerlessTriggersToServerless.js.map