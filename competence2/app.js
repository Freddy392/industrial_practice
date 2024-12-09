const PlanComponent = {
    template: '#plan-template',
    props: {
        name: { type: String, required: true },
        selected: { type: Boolean, default: false }
    },
    methods: {
        select() {
            this.$emit('select', this.name);
        }
    }
}

const PlanPickerItemComponent = {
    template: '#plan-picker-item-template',
    props: {
        name: { type: String, required: true },
        selected: { type: Boolean, default: false }
    },
    methods: {
        select() {
            this.$emit('select', this.name);
        }
    }
}

const PlanPickerComponent = {
    components: {
        plan: PlanComponent,
        'plan-picker-item': PlanPickerItemComponent
    },
    template: '#plan-picker-template',
    data() {
        return {
            plans: ['The Single', 'The Curious', 'The Addict'],
            selectedPlan: null
        }
    },
    methods: {
        selectPlan(plan) {
            this.selectedPlan = plan;
        }
    }
}

const BlogPostComponent = {
    props: ['id'],
    data() {
        return {
            blogPost: null,
            error: null
        };
    },
    async created() {
        const id = this.id;
        try {
            const response = await axios.get(`api/posts/${id}`);
            this.blogPost = response.data;
        } catch (e) {
            this.error = 'Ошибка при загрузке поста';
            console.error(e);
        }
    },
    template: `
        <div class="blog-post">
            <h2>{{ blogPost ? blogPost.title : 'Загрузка...' }}</h2>
            <p v-if="blogPost">{{ blogPost.content }}</p>
            <p v-else-if="error">{{ error }}</p>
        </div>
    `
};

const app = Vue.createApp({})
    .component('plan', PlanComponent)
    .component('plan-picker', PlanPickerComponent)
    .component('click-counter', {
        template: '#click-counter-template',
        data() {
            return {
                count: 0
            }
        }
    })
    .component('blog-post', BlogPostComponent)
    .component('todo-item', {
        template: '#todo-item-template',
        data() {
            return {
                done: false
            }
        }
    })
    .mount('#app');
