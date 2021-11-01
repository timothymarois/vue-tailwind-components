# vue-tailwind-components

## SETUP

```

# Install Deps
npm ci

# View isolated components
npm run storybook

```


## ELEMENTS: 

### Button

[View Code](https://github.com/timothymarois/vue-tailwind-components/blob/main/src/components/Elements/TButton.vue) | [View Examples](https://github.com/timothymarois/vue-tailwind-components/blob/main/stories/TButton.stories.js)

```vue
<t-button>Button</t-button>
```

### Icon

[View Code](https://github.com/timothymarois/vue-tailwind-components/blob/main/src/components/Elements/TIcon.vue) | [View Examples](https://github.com/timothymarois/vue-tailwind-components/blob/main/stories/TIcon.stories.js)

```vue
<t-icon value="cog" />
```

### Card

[View Code](https://github.com/timothymarois/vue-tailwind-components/blob/main/src/components/Elements/TCard.vuee) | [View Examples](https://github.com/timothymarois/vue-tailwind-components/blob/main/stories/TCard.stories.js)

```vue
<t-card>Card Content</t-card>
```

### Menu (Dropdown)

[View Code](https://github.com/timothymarois/vue-tailwind-components/blob/main/src/components/Elements/TMenu.vue) | [View Examples](https://github.com/timothymarois/vue-tailwind-components/blob/main/stories/TMenu.stories.js)

```vue
<t-menu :items="items" label="My Dropdown" />
```

### Tabs

[View Code](https://github.com/timothymarois/vue-tailwind-components/blob/main/src/components/Elements/TTabs.vue) | [View Examples](https://github.com/timothymarois/vue-tailwind-components/blob/main/stories/TTabs.stories.js)

```vue
<t-tabs v-model="tabs" :items="items" >
    <template slot="tab1">
        This is tab 1 content with cards
    </template>
</t-tabs>
```

### Modals

[View Code](https://github.com/timothymarois/vue-tailwind-components/blob/main/src/components/Elements/TModal.vue) | [View Examples](https://github.com/timothymarois/vue-tailwind-components/blob/main/stories/TModal.stories.js)

```vue
<t-modal :show="showing" @end="showing = false">
    Modal content here....
</t-modal>
```


## FORMS: 

### Select

[View Code](https://github.com/timothymarois/vue-tailwind-components/blob/main/src/components/Forms/TSelect.vue) | [View Examples](https://github.com/timothymarois/vue-tailwind-components/blob/main/stories/TSelect.stories.js)

Options can be Array of objects or an Array of values. 

```vue
<t-select 
    v-model="value" 
    label="My Select" 
    :options="options" 
    placeholder="Select One" 
/>
```

### Text Field

[View Code](https://github.com/timothymarois/vue-tailwind-components/blob/main/src/components/Forms/TTextField.vue) | [View Examples](https://github.com/timothymarois/vue-tailwind-components/blob/main/stories/TTextField.stories.js)

```vue
<t-text-field v-model="value" label="First Name" placeholder="First Name" required />
```

### Checkbox

[View Code](https://github.com/timothymarois/vue-tailwind-components/blob/main/src/components/Forms/TCheckbox.vue) | [View Examples](https://github.com/timothymarois/vue-tailwind-components/blob/main/stories/TCheckbox.stories.js)

```vue
<t-checkbox v-model="value" label="My Checkbox" />
```

