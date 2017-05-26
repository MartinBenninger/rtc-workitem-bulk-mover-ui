import Vue from 'vue';
import template from './wi-table.html';

const WorkItemTableComponent = Vue.extend({
   template,
   components: {},
   props: {
      workItems: Array,
      columns: Object,
   },

   data() {
      return {
         filterSelection: '',
         filterKey: '',
      };
   },

   methods: {
      countSelected(data) {
         return data.filter((x) => x.checked).length;
      },

      getOptions() {
         let options = [{id: "custom", name: "", disabled: true}];
         const data = this.filteredData;
         if(data.length >= 0) {
            const selected = this.countSelected(data);
            if(data.length < this.workItems.length) {
               if(selected > 0) {
                  options.push({id: "deselectFiltered", name: "Deselect Filtered", disabled: false});
               }
               if(selected < data.length) {
                  options.push({id: "selectFiltered", name: "Select Filtered", disabled: false});
               }
            }
            if(selected > 0) {
               options.push({id: "deselectAll", name: "Deselect All", disabled: false});
            }
            if(selected < data.length) {
               options.push({id: "selectAll", name: "Select All", disabled: false});
            }
         }
         return options;
      },

      filterSelectChanged() {
         console.log("filterSelectChanged", this.filterSelection);
         switch(this.filterSelection) {
            case "deselectFiltered":
               this.updateChecked(this.filteredData, false);
               break;
            case "selectFiltered":
               this.updateChecked(this.filteredData, true);
               break;
            case "deselectAll":
               this.updateChecked(this.workItems, false);
               break;
            case "selectAll":
               this.updateChecked(this.workItems, true);
               break;
            default:
               break;
         }
      },

      updateChecked(data, checked) {
         data.forEach((x) => x.checked = checked);
      },
   },

   computed: {
      filteredData: function () {
         console.log("filteredData", this.filterKey);
         const filterKey = this.filterKey && this.filterKey.toLowerCase();
         let data = this.workItems;
         if (filterKey) {
            data = data.filter(function (row) {
               return Object.keys(row).some(function (key) {
                  return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
               });
            });
         }
         return data;
      }
   }
});

export default WorkItemTableComponent;
