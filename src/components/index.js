/**
 * Application
 */
import TApp from './Application/TApp.vue'

/**
 * Elements
 */
import TAlert from './Elements/TAlert.vue'
import TIcon from './Elements/TIcon.vue'
import TLoader from './Elements/TLoader.vue'
import TButton from './Elements/TButton.vue'
import TMenu from './Elements/TMenu.vue'
import TModal from './Elements/TModal.vue'
import TOverlay from './Elements/TOverlay.vue'
import TCard from './Elements/TCard.vue'
import TBadge from './Elements/TBadge.vue'
import TTooltip from './Elements/TTooltip.vue'
import TTabs from './Elements/TTabs.vue'
import TTabContent from './Elements/TTabContent.vue'
import TAvatar from './Elements/TAvatar.vue';
import TNotify from './Elements/TNotify.vue';
import TStepper from './Elements/TStepper.vue';
import TProgressBar from './Elements/TProgressBar.vue';

/**
 * Forms
 */
import TLabel from './Forms/TLabel.vue'
import TTextField from './Forms/TTextField.vue'
import TSelect from './Forms/TSelect.vue'
import TCheckbox from './Forms/TCheckbox.vue'
import TSwitch from './Forms/TSwitch.vue'

/**
 * Tables
 */
import TTableSimple from './Tables/TTableSimple.vue'
import TPagination from './Tables/TPagination.vue'


const configure = (component, props) => {
    const componentProps = component?.options?.props;
    const componentName = component?.options?.name;

    if (!props || !componentProps) {
        return component;
    }

    const customProps = {};

    Object.keys(props).forEach((customPropName) => {
        const defaultProp = componentProps[customPropName];

        if (!defaultProp) {
            return;
        }
        const newDefaultValue = props[customPropName];

        customProps[customPropName] = {
            type: defaultProp?.type,
            default: ['object', 'function'].includes(typeof newDefaultValue)
                ? () => newDefaultValue
                : newDefaultValue,
        };
    });

    return component.extend({
        props: customProps,
    });
};
  

const install = function installVueComponents(vueInstance, settings) {      
    if (install.installed) return;
    install.installed = true;

    if (!settings) {
      return;
    }
  
    Object.keys(settings).forEach((componentName) => {
        const componentSettings = settings[componentName];

        if (typeof componentSettings === 'function' && typeof componentSettings.extend !== undefined) {
            const component = componentSettings;
            vueInstance.component(componentName, configure(component));
            return;
        }

        const { component, props } = componentSettings;

        vueInstance.component(componentName, configure(component, props));
    });
};

const plugin = {
    install
};

export {
    TApp,
    
    TAlert,
    TIcon,
    TLoader,
    TButton,
    TMenu,
    TModal,
    TOverlay,
    TCard,
    TBadge,
    TTooltip,
    TTabs,
    TTabContent,
    TAvatar,
    TNotify,
    TStepper,
    TProgressBar,

    TLabel,
    TTextField,
    TSelect,
    TCheckbox,
    TSwitch,

    TTableSimple,
    TPagination
}

export default plugin;