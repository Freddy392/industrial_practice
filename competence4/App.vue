<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <v-row justify="space-between" align="center">
                <v-col>
                  <h1>{{ header || 'Welcome' }}</h1>
                </v-col>
                <v-col cols="auto">
                  <v-btn v-if="editing" @click="doEdit(false)" color="error">Cancel</v-btn>
                  <v-btn v-else @click="doEdit(true)" color="primary">Add Item</v-btn>
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-text>
              <v-form v-if="editing" @submit.prevent>
                <v-text-field
                  label="Add an Item"
                  v-model="newItem"
                  @keyup.enter="saveItem"
                  outlined
                ></v-text-field>

                <v-checkbox v-model="newItemHighPriority" label="High Priority"></v-checkbox>

                <v-btn
                  @click="saveItem"
                  :disabled="newItem.length === 0"
                  color="primary"
                  class="mt-2"
                >
                  Save Item
                </v-btn>
              </v-form>

              <v-alert v-if="showPurchasedAlert" type="success" border="left" class="mt-4">
                Nice job! You've bought all your items!
              </v-alert>

              <v-alert v-if="showEmptyListAlert" type="info" border="left" class="mt-4">
                Your shopping list is empty.
              </v-alert>

              <v-list>
                <v-list-item
                  v-for="item in reversedItems"
                  :key="item.id"
                  class="list-item"
                >
                  <v-list-item-content @click="togglePurchased(item)">
                    <v-list-item-title :class="{ strikeout: item.purchased, priority: item.highPriority }">
                      {{ item.label }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click.stop="removeItem(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      header: 'Shopping List App',
      editing: false,
      newItem: '',
      newItemHighPriority: false,
      items: [
        { id: 1, label: '10 party hats', purchased: true, highPriority: false },
        { id: 2, label: '2 board games', purchased: true, highPriority: false },
        { id: 3, label: '20 cups', purchased: false, highPriority: true },
      ],
      showPurchasedAlert: false,
      showEmptyListAlert: false,
    }
  },
  computed: {
    reversedItems() {
      return [...this.items].reverse();
    },
  },
  methods: {
    saveItem() {
      if (this.newItem.trim() !== '') {
        this.items.push({
          id: this.items.length + 1,
          label: this.newItem,
          purchased: false,
          highPriority: this.newItemHighPriority,
        });
        this.newItem = '';
        this.newItemHighPriority = false;
        this.checkAlerts();
      }
    },
    doEdit(editing) {
      this.editing = editing;
      this.newItem = '';
      this.newItemHighPriority = false;
    },
    togglePurchased(item) {
      item.purchased = !item.purchased;
      this.checkAlerts();
    },
    removeItem(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.checkAlerts();
      }
    },
    checkAlerts() {
      this.showPurchasedAlert = this.items.length > 0 && this.items.every(item => item.purchased);
      this.showEmptyListAlert = this.items.length === 0;

      if (this.showEmptyListAlert) {
        setTimeout(() => {
          this.showEmptyListAlert = false;
        }, 3000);
      }
    },
  },
}
</script>

<style>
.strikeout {
  text-decoration: line-through;
}
.priority {
  font-weight: bold;
  color: #ff9800;
}
.list-item {
  transition: background-color 0.3s ease;
}
.list-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.list-item:active {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>