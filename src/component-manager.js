const ComponentManager = {
    components:{},
    registerComponent(name, component) {
        ComponentManager.components[name] = component
    }
}

export default ComponentManager
