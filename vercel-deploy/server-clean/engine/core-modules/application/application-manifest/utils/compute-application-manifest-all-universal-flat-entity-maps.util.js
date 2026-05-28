"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeApplicationManifestAllUniversalFlatEntityMaps", {
    enumerable: true,
    get: function() {
        return computeApplicationManifestAllUniversalFlatEntityMaps;
    }
});
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _generateindexforflatfieldmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/generate-index-for-flat-field-metadata.util");
const _fromapplicationvariablemanifesttouniversalflatapplicationvariableutil = require("../converters/from-application-variable-manifest-to-universal-flat-application-variable.util");
const _fromcommandmenuitemmanifesttouniversalflatcommandmenuitemutil = require("../converters/from-command-menu-item-manifest-to-universal-flat-command-menu-item.util");
const _fromconnectionprovidermanifesttouniversalflatconnectionproviderutil = require("../converters/from-connection-provider-manifest-to-universal-flat-connection-provider.util");
const _fromfieldmanifesttouniversalflatfieldmetadatautil = require("../converters/from-field-manifest-to-universal-flat-field-metadata.util");
const _fromfieldpermissionmanifesttouniversalflatfieldpermissionutil = require("../converters/from-field-permission-manifest-to-universal-flat-field-permission.util");
const _fromfrontcomponentmanifesttouniversalflatfrontcomponentutil = require("../converters/from-front-component-manifest-to-universal-flat-front-component.util");
const _fromindexmanifesttouniversalflatindexutil = require("../converters/from-index-manifest-to-universal-flat-index.util");
const _fromlogicfunctionmanifesttouniversalflatlogicfunctionutil = require("../converters/from-logic-function-manifest-to-universal-flat-logic-function.util");
const _fromnavigationmenuitemmanifesttouniversalflatnavigationmenuitemutil = require("../converters/from-navigation-menu-item-manifest-to-universal-flat-navigation-menu-item.util");
const _fromobjectmanifesttouniversalflatobjectmetadatautil = require("../converters/from-object-manifest-to-universal-flat-object-metadata.util");
const _fromobjectpermissionmanifesttouniversalflatobjectpermissionutil = require("../converters/from-object-permission-manifest-to-universal-flat-object-permission.util");
const _frompagelayoutmanifesttouniversalflatpagelayoututil = require("../converters/from-page-layout-manifest-to-universal-flat-page-layout.util");
const _frompagelayouttabmanifesttouniversalflatpagelayouttabutil = require("../converters/from-page-layout-tab-manifest-to-universal-flat-page-layout-tab.util");
const _frompagelayoutwidgetmanifesttouniversalflatpagelayoutwidgetutil = require("../converters/from-page-layout-widget-manifest-to-universal-flat-page-layout-widget.util");
const _frompermissionflagmanifesttouniversalflatpermissionflagutil = require("../converters/from-permission-flag-manifest-to-universal-flat-permission-flag.util");
const _frompermissionflagtouniversalflatrolepermissionflagutil = require("../converters/from-permission-flag-to-universal-flat-role-permission-flag.util");
const _fromrolemanifesttouniversalflatroleutil = require("../converters/from-role-manifest-to-universal-flat-role.util");
const _fromskillmanifesttouniversalflatskillutil = require("../converters/from-skill-manifest-to-universal-flat-skill.util");
const _computesearchvectoruniversalsettingsfromobjectmanifestutil = require("./compute-search-vector-universal-settings-from-object-manifest.util");
const _fromviewfieldgroupmanifesttouniversalflatviewfieldgrouputil = require("../converters/from-view-field-group-manifest-to-universal-flat-view-field-group.util");
const _fromviewfieldmanifesttouniversalflatviewfieldutil = require("../converters/from-view-field-manifest-to-universal-flat-view-field.util");
const _fromviewfiltergroupmanifesttouniversalflatviewfiltergrouputil = require("../converters/from-view-filter-group-manifest-to-universal-flat-view-filter-group.util");
const _fromviewfiltermanifesttouniversalflatviewfilterutil = require("../converters/from-view-filter-manifest-to-universal-flat-view-filter.util");
const _fromviewgroupmanifesttouniversalflatviewgrouputil = require("../converters/from-view-group-manifest-to-universal-flat-view-group.util");
const _fromviewmanifesttouniversalflatviewutil = require("../converters/from-view-manifest-to-universal-flat-view.util");
const _fromviewsortmanifesttouniversalflatviewsortutil = require("../converters/from-view-sort-manifest-to-universal-flat-view-sort.util");
const _fromagentmanifesttouniversalflatagentutil = require("../../utils/from-agent-manifest-to-universal-flat-agent.util");
const _createemptyallflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-all-flat-entity-maps.constant");
const _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil = require("../../../../workspace-manager/workspace-migration/universal-flat-entity/utils/add-universal-flat-entity-to-universal-flat-entity-maps-through-mutation-or-throw.util");
const computeApplicationManifestAllUniversalFlatEntityMaps = ({ manifest, ownerFlatApplication, now })=>{
    const allUniversalFlatEntityMaps = (0, _createemptyallflatentitymapsconstant.createEmptyAllFlatEntityMaps)();
    const { universalIdentifier: applicationUniversalIdentifier } = ownerFlatApplication;
    for (const objectManifest of manifest.objects){
        const flatObjectMetadata = (0, _fromobjectmanifesttouniversalflatobjectmetadatautil.fromObjectManifestToUniversalFlatObjectMetadata)({
            objectManifest,
            applicationUniversalIdentifier,
            now
        });
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: flatObjectMetadata,
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatObjectMetadataMaps
        });
        for (const fieldManifest of objectManifest.fields){
            const enrichedFieldManifest = fieldManifest.type === _types.FieldMetadataType.TS_VECTOR && !(0, _utils.isDefined)(fieldManifest.universalSettings) ? {
                ...fieldManifest,
                objectUniversalIdentifier: objectManifest.universalIdentifier,
                universalSettings: (0, _computesearchvectoruniversalsettingsfromobjectmanifestutil.computeSearchVectorUniversalSettingsFromObjectManifest)({
                    objectManifest
                })
            } : {
                ...fieldManifest,
                objectUniversalIdentifier: objectManifest.universalIdentifier
            };
            const flatFieldMetadata = (0, _fromfieldmanifesttouniversalflatfieldmetadatautil.fromFieldManifestToUniversalFlatFieldMetadata)({
                fieldManifest: enrichedFieldManifest,
                applicationUniversalIdentifier,
                now
            });
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: flatFieldMetadata,
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatFieldMetadataMaps
            });
            if (flatFieldMetadata.isUnique) {
                (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                    universalFlatEntity: (0, _generateindexforflatfieldmetadatautil.generateIndexForFlatFieldMetadata)({
                        flatFieldMetadata,
                        flatObjectMetadata
                    }),
                    universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatIndexMaps
                });
            }
        }
    }
    for (const fieldManifest of manifest.fields){
        const flatFieldMetadata = (0, _fromfieldmanifesttouniversalflatfieldmetadatautil.fromFieldManifestToUniversalFlatFieldMetadata)({
            fieldManifest: fieldManifest,
            applicationUniversalIdentifier,
            now
        });
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: flatFieldMetadata,
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatFieldMetadataMaps
        });
        if (flatFieldMetadata.isUnique) {
            const flatObjectMetadata = allUniversalFlatEntityMaps.flatObjectMetadataMaps.byUniversalIdentifier[flatFieldMetadata.objectMetadataUniversalIdentifier];
            if ((0, _utils.isDefined)(flatObjectMetadata)) {
                (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                    universalFlatEntity: (0, _generateindexforflatfieldmetadatautil.generateIndexForFlatFieldMetadata)({
                        flatFieldMetadata,
                        flatObjectMetadata
                    }),
                    universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatIndexMaps
                });
            }
        }
    }
    const indexCountByObjectUniversalIdentifier = new Map();
    const fieldsByObjectUniversalIdentifier = new Map();
    for (const flatField of Object.values(allUniversalFlatEntityMaps.flatFieldMetadataMaps.byUniversalIdentifier)){
        if (!(0, _utils.isDefined)(flatField)) continue;
        const bucket = fieldsByObjectUniversalIdentifier.get(flatField.objectMetadataUniversalIdentifier) ?? [];
        if (bucket.length === 0) {
            fieldsByObjectUniversalIdentifier.set(flatField.objectMetadataUniversalIdentifier, bucket);
        }
        bucket.push(flatField);
    }
    for (const indexManifest of manifest.indexes ?? []){
        const flatObjectMetadata = allUniversalFlatEntityMaps.flatObjectMetadataMaps.byUniversalIdentifier[indexManifest.objectUniversalIdentifier];
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            throw new Error(`Index "${indexManifest.universalIdentifier}" references unknown object ${indexManifest.objectUniversalIdentifier}`);
        }
        const nextCount = (indexCountByObjectUniversalIdentifier.get(indexManifest.objectUniversalIdentifier) ?? 0) + 1;
        if (nextCount > _constants.MAX_CUSTOM_INDEXES_PER_OBJECT) {
            throw new Error(`Application declares more than ${_constants.MAX_CUSTOM_INDEXES_PER_OBJECT} indexes on object ${indexManifest.objectUniversalIdentifier}`);
        }
        indexCountByObjectUniversalIdentifier.set(indexManifest.objectUniversalIdentifier, nextCount);
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromindexmanifesttouniversalflatindexutil.fromIndexManifestToUniversalFlatIndex)({
                indexManifest,
                flatObjectMetadata,
                objectFlatFieldMetadatas: fieldsByObjectUniversalIdentifier.get(flatObjectMetadata.universalIdentifier) ?? [],
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatIndexMaps
        });
    }
    for (const logicFunctionManifest of manifest.logicFunctions){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromlogicfunctionmanifesttouniversalflatlogicfunctionutil.fromLogicFunctionManifestToUniversalFlatLogicFunction)({
                logicFunctionManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatLogicFunctionMaps
        });
    }
    for (const frontComponentManifest of manifest.frontComponents){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromfrontcomponentmanifesttouniversalflatfrontcomponentutil.fromFrontComponentManifestToUniversalFlatFrontComponent)({
                frontComponentManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatFrontComponentMaps
        });
    }
    for (const connectionProviderManifest of manifest.connectionProviders ?? []){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromconnectionprovidermanifesttouniversalflatconnectionproviderutil.fromConnectionProviderManifestToUniversalFlatConnectionProvider)({
                connectionProviderManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatConnectionProviderMaps
        });
    }
    for (const permissionFlagManifest of manifest.permissionFlags ?? []){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _frompermissionflagmanifesttouniversalflatpermissionflagutil.fromPermissionFlagManifestToUniversalFlatPermissionFlag)({
                permissionFlagManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatPermissionFlagMaps
        });
    }
    for (const roleManifest of manifest.roles){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromrolemanifesttouniversalflatroleutil.fromRoleManifestToUniversalFlatRole)({
                roleManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatRoleMaps
        });
        for (const objectPermissionManifest of roleManifest.objectPermissions ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _fromobjectpermissionmanifesttouniversalflatobjectpermissionutil.fromObjectPermissionManifestToUniversalFlatObjectPermission)({
                    objectPermissionManifest,
                    roleUniversalIdentifier: roleManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatObjectPermissionMaps
            });
        }
        for (const fieldPermissionManifest of roleManifest.fieldPermissions ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _fromfieldpermissionmanifesttouniversalflatfieldpermissionutil.fromFieldPermissionManifestToUniversalFlatFieldPermission)({
                    fieldPermissionManifest,
                    roleUniversalIdentifier: roleManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatFieldPermissionMaps
            });
        }
        for (const permissionFlagUniversalIdentifier of roleManifest.permissionFlagUniversalIdentifiers ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _frompermissionflagtouniversalflatrolepermissionflagutil.fromPermissionFlagToUniversalFlatRolePermissionFlag)({
                    permissionFlagUniversalIdentifier,
                    roleUniversalIdentifier: roleManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatRolePermissionFlagMaps
            });
        }
    }
    for (const skillManifest of manifest.skills ?? []){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromskillmanifesttouniversalflatskillutil.fromSkillManifestToUniversalFlatSkill)({
                skillManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatSkillMaps
        });
    }
    for (const agentManifest of manifest.agents ?? []){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromagentmanifesttouniversalflatagentutil.fromAgentManifestToUniversalFlatAgent)({
                agentManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatAgentMaps
        });
    }
    for (const viewManifest of manifest.views ?? []){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromviewmanifesttouniversalflatviewutil.fromViewManifestToUniversalFlatView)({
                viewManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatViewMaps
        });
        for (const viewFieldGroupManifest of viewManifest.fieldGroups ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _fromviewfieldgroupmanifesttouniversalflatviewfieldgrouputil.fromViewFieldGroupManifestToUniversalFlatViewFieldGroup)({
                    viewFieldGroupManifest,
                    viewUniversalIdentifier: viewManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatViewFieldGroupMaps
            });
        }
        for (const viewFieldManifest of viewManifest.fields ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _fromviewfieldmanifesttouniversalflatviewfieldutil.fromViewFieldManifestToUniversalFlatViewField)({
                    viewFieldManifest,
                    viewUniversalIdentifier: viewManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatViewFieldMaps
            });
        }
        for (const viewFilterGroupManifest of viewManifest.filterGroups ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _fromviewfiltergroupmanifesttouniversalflatviewfiltergrouputil.fromViewFilterGroupManifestToUniversalFlatViewFilterGroup)({
                    viewFilterGroupManifest,
                    viewUniversalIdentifier: viewManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatViewFilterGroupMaps
            });
        }
        for (const viewFilterManifest of viewManifest.filters ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _fromviewfiltermanifesttouniversalflatviewfilterutil.fromViewFilterManifestToUniversalFlatViewFilter)({
                    viewFilterManifest,
                    viewUniversalIdentifier: viewManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatViewFilterMaps
            });
        }
        for (const viewGroupManifest of viewManifest.groups ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _fromviewgroupmanifesttouniversalflatviewgrouputil.fromViewGroupManifestToUniversalFlatViewGroup)({
                    viewGroupManifest,
                    viewUniversalIdentifier: viewManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatViewGroupMaps
            });
        }
        for (const viewSortManifest of viewManifest.sorts ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _fromviewsortmanifesttouniversalflatviewsortutil.fromViewSortManifestToUniversalFlatViewSort)({
                    viewSortManifest,
                    viewUniversalIdentifier: viewManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatViewSortMaps
            });
        }
    }
    for (const navigationMenuItemManifest of manifest.navigationMenuItems ?? []){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromnavigationmenuitemmanifesttouniversalflatnavigationmenuitemutil.fromNavigationMenuItemManifestToUniversalFlatNavigationMenuItem)({
                navigationMenuItemManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatNavigationMenuItemMaps
        });
    }
    for (const pageLayoutManifest of manifest.pageLayouts ?? []){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _frompagelayoutmanifesttouniversalflatpagelayoututil.fromPageLayoutManifestToUniversalFlatPageLayout)({
                pageLayoutManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatPageLayoutMaps
        });
        for (const pageLayoutTabManifest of pageLayoutManifest.tabs ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _frompagelayouttabmanifesttouniversalflatpagelayouttabutil.fromPageLayoutTabManifestToUniversalFlatPageLayoutTab)({
                    pageLayoutTabManifest,
                    pageLayoutUniversalIdentifier: pageLayoutManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatPageLayoutTabMaps
            });
            for (const pageLayoutWidgetManifest of pageLayoutTabManifest.widgets ?? []){
                (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                    universalFlatEntity: (0, _frompagelayoutwidgetmanifesttouniversalflatpagelayoutwidgetutil.fromPageLayoutWidgetManifestToUniversalFlatPageLayoutWidget)({
                        pageLayoutWidgetManifest,
                        pageLayoutTabUniversalIdentifier: pageLayoutTabManifest.universalIdentifier,
                        applicationUniversalIdentifier,
                        now
                    }),
                    universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatPageLayoutWidgetMaps
                });
            }
        }
    }
    for (const pageLayoutTabManifest of manifest.pageLayoutTabs ?? []){
        if (!(0, _utils.isDefined)(pageLayoutTabManifest.pageLayoutUniversalIdentifier)) {
            throw new Error(`Top-level pageLayoutTab "${pageLayoutTabManifest.universalIdentifier}" is missing required pageLayoutUniversalIdentifier`);
        }
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _frompagelayouttabmanifesttouniversalflatpagelayouttabutil.fromPageLayoutTabManifestToUniversalFlatPageLayoutTab)({
                pageLayoutTabManifest,
                pageLayoutUniversalIdentifier: pageLayoutTabManifest.pageLayoutUniversalIdentifier,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatPageLayoutTabMaps
        });
        for (const pageLayoutWidgetManifest of pageLayoutTabManifest.widgets ?? []){
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: (0, _frompagelayoutwidgetmanifesttouniversalflatpagelayoutwidgetutil.fromPageLayoutWidgetManifestToUniversalFlatPageLayoutWidget)({
                    pageLayoutWidgetManifest,
                    pageLayoutTabUniversalIdentifier: pageLayoutTabManifest.universalIdentifier,
                    applicationUniversalIdentifier,
                    now
                }),
                universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatPageLayoutWidgetMaps
            });
        }
    }
    for (const [key, applicationVariableManifest] of Object.entries(manifest.application.applicationVariables ?? {})){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromapplicationvariablemanifesttouniversalflatapplicationvariableutil.fromApplicationVariableManifestToUniversalFlatApplicationVariable)({
                key,
                universalIdentifier: applicationVariableManifest.universalIdentifier,
                value: 'value' in applicationVariableManifest ? applicationVariableManifest.value : undefined,
                description: applicationVariableManifest.description,
                isSecret: applicationVariableManifest.isSecret,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatApplicationVariableMaps
        });
    }
    for (const commandMenuItemManifest of manifest.commandMenuItems ?? []){
        if (!(0, _utils.isDefined)(commandMenuItemManifest.frontComponentUniversalIdentifier)) {
            throw new Error(`Top-level commandMenuItem "${commandMenuItemManifest.universalIdentifier}" is missing required frontComponentUniversalIdentifier`);
        }
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: (0, _fromcommandmenuitemmanifesttouniversalflatcommandmenuitemutil.fromCommandMenuItemManifestToUniversalFlatCommandMenuItem)({
                commandMenuItemManifest,
                applicationUniversalIdentifier,
                now
            }),
            universalFlatEntityMapsToMutate: allUniversalFlatEntityMaps.flatCommandMenuItemMaps
        });
    }
    return allUniversalFlatEntityMaps;
};

//# sourceMappingURL=compute-application-manifest-all-universal-flat-entity-maps.util.js.map