<template>
  <div class="el-select" v-clickoutside="handleClose">
    <div
      class="el-select__tags"
      v-if="multiple"
      @click.stop="toggleMenu"
      ref="tags"
      :style="{ 'max-width': inputWidth - 32 + 'px' }">
      <transition-group @after-leave="resetInputHeight">
        <el-tag
          v-for="item in selected"
          :key="item.id"
          closable
          type="primary"
          @close="deleteTag($event, item)"
          close-transition>
          <span class="el-select__tags-text">{{ item[propNames.label] }}</span>
        </el-tag>
      </transition-group>
    </div>
    <el-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :size="size"
      :disabled="disabled"
      :readonly="multiple"
      :validate-event="false"
      @focus="visible = true"
      @click="handleIconClick"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
      :icon="iconClass">
    </el-input>
    <transition
      name="el-zoom-in-top"
      @after-leave="doDestroy"
      @after-enter="handleMenuEnter">
      <el-select-menu
        ref="popper"
        v-show="visible && emptyText !== false">
        <el-scrollbar
          tag="div"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          class='is-empty'
          v-show="treeData && !loading">
          <el-tree :data="treeData" ref="tree"
                   :show-checkbox="multiple"
                   node-key="id"
                   check-strictly
                   :props="propNames"
                   @check-change="handleCheckChange"
                   @node-click="handleTreeNodeClick">
          </el-tree>
        </el-scrollbar>
      </el-select-menu>
    </transition>
  </div>
</template>

<script type="text/babel">
  import Emitter from 'element-ui/src/mixins/emitter';
  import Locale from 'element-ui/src/mixins/locale';
  import ElSelectMenu from 'element-ui/packages/select/src/select-dropdown.vue';
  import Clickoutside from 'element-ui/src/utils/clickoutside';
  import {addClass, removeClass, hasClass} from 'element-ui/src/utils/dom';
  import {addResizeListener, removeResizeListener} from 'element-ui/src/utils/resize-event';
  import {t} from 'element-ui/src/locale';
  import merge from 'element-ui/src/utils/merge';
  import treeter from "../components/treeter"

  const sizeMap = {
    'large': 42,
    'small': 30,
    'mini': 22
  };

  export default {
    mixins: [Emitter, Locale, treeter],

    name: 'ElSelectTree',

    componentName: 'ElSelectTree',

    computed: {
      iconClass() {
        let criteria = this.clearable && !this.disabled &&
          this.inputHovering && !this.multiple &&
          this.value !== undefined && this.value != null &&
          this.value !== '';
        return criteria ? 'circle-close is-show-close' : 'caret-top';
      },

      emptyText() {
        if (this.loading) {
          return this.loadingText || this.t('el.select.loading');
        } else {
          if (this.treeData.length === 0) {
            return this.noDataText || this.t('el.select.noData');
          }
        }
        return null;
      },

    },

    components: {ElSelectMenu},

    directives: {Clickoutside},

    props: {
      name: String,
      value: {},
      treeData: Array,
      size: String,
      disabled: Boolean,
      clearable: Boolean,
      loading: Boolean,
      popperClass: String,
      loadingText: String,
      noDataText: String,
      multiple: Boolean,
      propNames: {
        type: Object,
        default(){
          return {children: 'children', label: 'label', id: 'id'}
        }
      },
      multipleLimit: {
        type: Number,
        default: 0
      },
      placeholder: {
        type: String,
        default() {
          return t('el.select.placeholder');
        }
      }
    },

    data() {
      return {
        selected: this.multiple ? [] : {},
        inputLength: 20,
        inputWidth: 0,
        currentPlaceholder: '',
        dropdownUl: null,
        visible: false,
        selectedLabel: '',
        bottomOverflow: 0,
        topOverflow: 0,
        inputHovering: false,
      };
    },

    watch: {
      value(val) {
        this.handleResize();
        if (!!val) {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.placeholder;
        }
        this.setSelected(val);
        this.$emit('change', val);
        this.dispatch('ElFormItem', 'el.form.change', val);
      },
      visible(val) {
        if (!val) {
          this.$refs.reference.$el.querySelector('input').blur();
          this.handleIconHide();
          this.broadcast('ElSelectDropdown', 'destroyPopper');
          if (!this.multiple) {
            this.inputLength = 20;
            this.getOverflows();
          }
        } else {
          this.handleIconShow();
          this.broadcast('ElSelectDropdown', 'updatePopper');
        }
        this.$emit('visible-change', val);
      },

    },

    methods: {
      handleIconHide() {
        let icon = this.$el.querySelector('.el-input__icon');
        if (icon) {
          removeClass(icon, 'is-reverse');
        }
      },

      handleIconShow() {
        let icon = this.$el.querySelector('.el-input__icon');
        if (icon && !hasClass(icon, 'el-icon-circle-close')) {
          addClass(icon, 'is-reverse');
        }
      },

      handleMenuEnter() {
        if (!this.dropdownUl) {
          this.dropdownUl = this.$refs.popper.$el.querySelector('.el-select-dropdown__wrap');
          this.getOverflows();
        }
        if (!this.multiple && this.dropdownUl) {
          this.resetMenuScroll();
        }
      },

      getOverflows() {
        if (this.dropdownUl && this.selected && this.selected.$el) {
          let selectedRect = this.selected.$el.getBoundingClientRect();
          let popperRect = this.$refs.popper.$el.getBoundingClientRect();
          this.bottomOverflow = selectedRect.bottom - popperRect.bottom;
          this.topOverflow = selectedRect.top - popperRect.top;
        }
      },

      resetMenuScroll() {
        if (this.bottomOverflow > 0) {
          this.dropdownUl.scrollTop += this.bottomOverflow;
        } else if (this.topOverflow < 0) {
          this.dropdownUl.scrollTop += this.topOverflow;
        }
      },

      setSelected(ids) {
        if (!!ids) {
          if (this.multiple) {
            this.$refs.tree.setCheckedKeys(ids);
            this.selected = this.$refs.tree.getCheckedNodes();
          } else {
            this.selected = this.findFromTree(this.treeData, ids, this.propNames.id, this.propNames.children);
            this.selectedLabel = !!this.selected ? this.selected[this.propNames.label] : '';
          }
        } else {
          this.selected = this.multiple ? [] : {};
          this.selectedLabel = '';
        }
      },


      handleIconClick(event) {
        if (this.iconClass.indexOf('circle-close') > -1) {
          this.deleteSelected(event);
        } else {
          this.toggleMenu();
        }
      },

      doDestroy() {
        this.$refs.popper && this.$refs.popper.doDestroy();
      },

      handleClose() {
        this.visible = false;
      },

      managePlaceholder() {
        if (this.currentPlaceholder !== '') {
          this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
        }
      },

      resetInputState(e) {
        if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
        this.inputLength = this.$refs.input.value.length * 15 + 20;
        this.resetInputHeight();
      },

      resetInputHeight() {
        this.$nextTick(() => {
          if (!this.$refs.reference) return;
          let inputChildNodes = this.$refs.reference.$el.childNodes;
          let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];
          input.style.height = Math.max(this.$refs.tags.clientHeight + 6, sizeMap[this.size] || 36) + 'px';
          if (this.visible && this.emptyText !== false) {
            this.broadcast('ElSelectDropdown', 'updatePopper');
          }
        });
      },

      handleTreeNodeClick(nodeData) {
        if (this.multiple) return;
        this.$emit('input', nodeData.id);
        this.visible = false;
        this.selectedLabel = nodeData[this.propNames.label];
        this.selected = nodeData;
        this.handleResize();
      },
      handleCheckChange(data, checked, indeterminate) {
        if (!this.multiple) return;
        this.selected = this.$refs.tree.getCheckedNodes();
        let tmpValue = [];
        if (this.selected) {
          this.selected.forEach((item, index) => {
            tmpValue.push(item.id);
          });
        }
        this.$emit('input', tmpValue);
        this.handleResize();
      },
      toggleMenu() {
        if (this.visible) {
          return;
        }
        if (!this.disabled) {
          this.visible = !this.visible;
        }
      },


      resetScrollTop() {
        let bottomOverflowDistance = this.options[this.hoverIndex].$el.getBoundingClientRect().bottom -
          this.$refs.popper.$el.getBoundingClientRect().bottom;
        let topOverflowDistance = this.options[this.hoverIndex].$el.getBoundingClientRect().top -
          this.$refs.popper.$el.getBoundingClientRect().top;
        if (bottomOverflowDistance > 0) {
          this.dropdownUl.scrollTop += bottomOverflowDistance;
        }
        if (topOverflowDistance < 0) {
          this.dropdownUl.scrollTop += topOverflowDistance;
        }
      },

      deleteSelected(event) {
        event.stopPropagation();
        this.$emit('input', '');
        this.selected = {};
        this.selectedLabel = '';
        this.visible = false;
      },

      deleteTag(event, tag) {
        let index = this.selected.indexOf(tag);
        if (index > -1 && !this.disabled) {
          this.value.splice(index, 1);
          this.selected.splice(index, 1);
          this.$emit('remove-tag', tag);
        }
        event.stopPropagation();
      },

      resetInputWidth() {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
      },

      handleResize() {
        this.resetInputWidth();
        if (this.multiple) {
          this.resetInputHeight();
        } else {
          this.inputLength = 20;
        }
      }
    },

    created() {
      this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
      if (this.multiple && !Array.isArray(this.value)) {
        this.$emit('input', []);
      }
      if (!this.multiple && Array.isArray(this.value)) {
        this.$emit('input', '');
      }
      this.setSelected();
      this.$on('setSelected', this.setSelected);
    },

    mounted() {
      addResizeListener(this.$el, this.handleResize);
      this.$nextTick(() => {
        if (this.$refs.reference && this.$refs.reference.$el) {
          this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
        }
      });
    },

    beforeDestroy() {
      if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
    }
  };
</script>
