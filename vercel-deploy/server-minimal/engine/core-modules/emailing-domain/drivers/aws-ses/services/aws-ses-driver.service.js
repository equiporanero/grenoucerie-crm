"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AwsSesDriver", {
    enumerable: true,
    get: function() {
        return AwsSesDriver;
    }
});
const _common = require("@nestjs/common");
const _clientsesv2 = require("@aws-sdk/client-sesv2");
const _awssesresourcenameprefixconstant = require("../constants/aws-ses-resource-name-prefix.constant");
const _emailingdomainstatustype = require("../../types/emailing-domain-status.type");
let AwsSesDriver = class AwsSesDriver {
    async verifyDomain(input) {
        try {
            this.logger.log(`Starting domain verification for: ${input.domain}`);
            const tenantName = this.buildTenantName(input.workspaceId);
            const { isVerified, verificationRecords } = await this.createOrUpdateEmailIdentity(input.domain, tenantName);
            if (isVerified) {
                await this.enableDkimSigning(input.domain);
            }
            return {
                status: isVerified ? _emailingdomainstatustype.EmailingDomainStatus.VERIFIED : _emailingdomainstatustype.EmailingDomainStatus.PENDING,
                verificationRecords
            };
        } catch (error) {
            this.logger.error(`Failed to verify domain ${input.domain}: ${error}`);
            this.awsSesHandleErrorService.handleAwsSesError(error, 'verifyDomain');
        }
    }
    async getDomainStatus(input) {
        try {
            this.logger.log(`Getting domain status for: ${input.domain}`);
            const sesClient = this.awsSesClientProvider.getSESClient();
            const getIdentityCommand = new _clientsesv2.GetEmailIdentityCommand({
                EmailIdentity: input.domain
            });
            const identityResponse = await sesClient.send(getIdentityCommand);
            const status = this.determineVerificationStatus(identityResponse);
            const verificationRecords = this.buildVerificationRecords(input.domain, identityResponse.DkimAttributes?.Tokens || []);
            return {
                status,
                verificationRecords
            };
        } catch (error) {
            if (error instanceof _clientsesv2.NotFoundException) {
                return {
                    status: _emailingdomainstatustype.EmailingDomainStatus.FAILED,
                    verificationRecords: []
                };
            }
            this.logger.error(`Failed to get domain status ${input.domain}: ${error}`);
            this.awsSesHandleErrorService.handleAwsSesError(error, 'getDomainStatus');
        }
    }
    async provisionWorkspace(workspaceId) {
        const tenantName = this.buildTenantName(workspaceId);
        await this.ensureTenantExists(tenantName);
        await this.awsSesRegisterDomainService.provisionWorkspaceResources({
            tenantName,
            configurationSetName: this.buildConfigurationSetName(workspaceId),
            contactListName: this.buildContactListName(workspaceId)
        }, this.config);
    }
    async registerDomain(input) {
        await this.awsSesRegisterDomainService.registerDomain(input.domain);
    }
    async sendEmail(input) {
        return this.awsSesSendEmailService.sendEmail(input, {
            tenantName: this.buildTenantName(input.workspaceId),
            configurationSetName: this.buildConfigurationSetName(input.workspaceId),
            contactListName: this.buildContactListName(input.workspaceId)
        });
    }
    async cleanupDomain(input) {
        const sesClient = this.awsSesClientProvider.getSESClient();
        const tenantName = this.buildTenantName(input.workspaceId);
        const identityArn = `arn:aws:ses:${this.config.region}:${this.config.accountId}:identity/${input.domain}`;
        await sesClient.send(new _clientsesv2.DeleteTenantResourceAssociationCommand({
            TenantName: tenantName,
            ResourceArn: identityArn
        })).catch((error)=>{
            if (!(error instanceof _clientsesv2.NotFoundException)) throw error;
        });
        await sesClient.send(new _clientsesv2.DeleteEmailIdentityCommand({
            EmailIdentity: input.domain
        })).catch((error)=>{
            if (!(error instanceof _clientsesv2.NotFoundException)) throw error;
        });
    }
    async deprovisionWorkspace(workspaceId) {
        const sesClient = this.awsSesClientProvider.getSESClient();
        const tenantName = this.buildTenantName(workspaceId);
        const configurationSetName = this.buildConfigurationSetName(workspaceId);
        const contactListName = this.buildContactListName(workspaceId);
        const configurationSetArn = `arn:aws:ses:${this.config.region}:${this.config.accountId}:configuration-set/${configurationSetName}`;
        await sesClient.send(new _clientsesv2.DeleteTenantResourceAssociationCommand({
            TenantName: tenantName,
            ResourceArn: configurationSetArn
        })).catch((error)=>{
            if (!(error instanceof _clientsesv2.NotFoundException)) throw error;
        });
        await sesClient.send(new _clientsesv2.DeleteConfigurationSetCommand({
            ConfigurationSetName: configurationSetName
        })).catch((error)=>{
            if (!(error instanceof _clientsesv2.NotFoundException)) throw error;
        });
        await sesClient.send(new _clientsesv2.DeleteContactListCommand({
            ContactListName: contactListName
        })).catch((error)=>{
            if (!(error instanceof _clientsesv2.NotFoundException)) throw error;
        });
        await sesClient.send(new _clientsesv2.DeleteTenantCommand({
            TenantName: tenantName
        })).catch((error)=>{
            if (!(error instanceof _clientsesv2.NotFoundException)) throw error;
        });
    }
    buildTenantName(workspaceId) {
        return `${_awssesresourcenameprefixconstant.AWS_SES_RESOURCE_NAME_PREFIX}-${workspaceId}`;
    }
    buildConfigurationSetName(workspaceId) {
        return `${_awssesresourcenameprefixconstant.AWS_SES_RESOURCE_NAME_PREFIX}-${workspaceId}`;
    }
    buildContactListName(workspaceId) {
        return `${_awssesresourcenameprefixconstant.AWS_SES_RESOURCE_NAME_PREFIX}-${workspaceId}`;
    }
    async ensureTenantExists(tenantName) {
        const sesClient = this.awsSesClientProvider.getSESClient();
        try {
            await sesClient.send(new _clientsesv2.CreateTenantCommand({
                TenantName: tenantName
            }));
            this.logger.log(`Created tenant: ${tenantName}`);
        } catch (error) {
            if (error instanceof _clientsesv2.AlreadyExistsException) {
                this.logger.log(`Tenant already exists: ${tenantName}`);
                return;
            }
            throw error;
        }
    }
    async createOrUpdateEmailIdentity(domain, tenantName) {
        const sesClient = this.awsSesClientProvider.getSESClient();
        try {
            const getIdentityCommand = new _clientsesv2.GetEmailIdentityCommand({
                EmailIdentity: domain
            });
            const existingIdentity = await sesClient.send(getIdentityCommand);
            const isVerified = existingIdentity.VerifiedForSendingStatus === true;
            const verificationRecords = this.buildVerificationRecords(domain, existingIdentity.DkimAttributes?.Tokens || []);
            await this.associateResourceWithTenant(domain, tenantName);
            return {
                isVerified,
                verificationRecords
            };
        } catch (error) {
            if (error instanceof _clientsesv2.NotFoundException) {
                return await this.createNewEmailIdentity(domain, tenantName);
            }
            throw error;
        }
    }
    async createNewEmailIdentity(domain, tenantName) {
        const sesClient = this.awsSesClientProvider.getSESClient();
        const createCommand = new _clientsesv2.CreateEmailIdentityCommand({
            EmailIdentity: domain,
            Tags: [
                {
                    Key: 'Tenant',
                    Value: tenantName
                }
            ]
        });
        const createResponse = await sesClient.send(createCommand);
        const dkimTokens = createResponse.DkimAttributes?.Tokens || [];
        await this.associateResourceWithTenant(domain, tenantName);
        const verificationRecords = this.buildVerificationRecords(domain, dkimTokens);
        return {
            isVerified: false,
            verificationRecords
        };
    }
    async associateResourceWithTenant(domain, tenantName) {
        const sesClient = this.awsSesClientProvider.getSESClient();
        try {
            await sesClient.send(new _clientsesv2.CreateTenantResourceAssociationCommand({
                TenantName: tenantName,
                ResourceArn: `arn:aws:ses:${this.config.region}:${this.config.accountId}:identity/${domain}`
            }));
            this.logger.log(`Associated domain ${domain} with tenant ${tenantName}`);
        } catch (error) {
            if (error instanceof _clientsesv2.AlreadyExistsException) {
                this.logger.log(`Domain ${domain} already associated with tenant ${tenantName}`);
                return;
            }
            throw error;
        }
    }
    async enableDkimSigning(domain) {
        const sesClient = this.awsSesClientProvider.getSESClient();
        const dkimCommand = new _clientsesv2.PutEmailIdentityDkimAttributesCommand({
            EmailIdentity: domain,
            SigningEnabled: true
        });
        await sesClient.send(dkimCommand);
        this.logger.log(`Enabled DKIM signing for domain: ${domain}`);
    }
    buildVerificationRecords(domain, dkimTokens) {
        return dkimTokens.map((token)=>({
                type: 'CNAME',
                key: `${token}._domainkey.${domain}`,
                value: `${token}.dkim.amazonses.com`
            }));
    }
    determineVerificationStatus(identityResponse) {
        const isVerified = identityResponse.VerifiedForSendingStatus === true;
        const isDkimEnabled = identityResponse.DkimAttributes?.SigningEnabled === true;
        const dkimStatus = identityResponse.DkimAttributes?.Status;
        if (isVerified && isDkimEnabled && dkimStatus === 'SUCCESS') {
            return _emailingdomainstatustype.EmailingDomainStatus.VERIFIED;
        }
        if (identityResponse.VerifiedForSendingStatus === false || dkimStatus === 'FAILED') {
            return _emailingdomainstatustype.EmailingDomainStatus.FAILED;
        }
        return _emailingdomainstatustype.EmailingDomainStatus.PENDING;
    }
    constructor(config, awsSesClientProvider, awsSesHandleErrorService, awsSesRegisterDomainService, awsSesSendEmailService){
        this.config = config;
        this.awsSesClientProvider = awsSesClientProvider;
        this.awsSesHandleErrorService = awsSesHandleErrorService;
        this.awsSesRegisterDomainService = awsSesRegisterDomainService;
        this.awsSesSendEmailService = awsSesSendEmailService;
        this.logger = new _common.Logger(AwsSesDriver.name);
    }
};

//# sourceMappingURL=aws-ses-driver.service.js.map