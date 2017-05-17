const findFromTree = (treeArray, id, idPropName = "id", childrenPropName = "children") => {
  if (!treeArray || treeArray == null || treeArray.length <= 0)return null;
  for (var i = 0; i < treeArray.length; i++) {
    if (treeArray[i][idPropName] == id) {
      return treeArray[i];
    } else {
      let result = findFromTree(treeArray[i][childrenPropName], id, idPropName, childrenPropName);
      if (result != null) {
        return result;
      }
    }
  }
  return null;
}

const appendTreeNode = (treeArray, item, idPropName = "id", parentPropName = "parentId", childrenPropName = "children") => {
  if (treeArray == null || treeArray.length <= 0)return;
  if (!item[parentPropName] || item[parentPropName] == null) {
    let i = treeArray.findIndex(p => p.sort > item.sort);
    if (i == -1) {
      i = treeArray.length;
    }
    treeArray.splice(i, 0, item);
    return;
  }
  for (var j = 0; j < treeArray.length; j++) {
    var value = treeArray[j];
    if (item[parentPropName] == value[idPropName]) {
      if (value[childrenPropName] && value[childrenPropName].length > 0) {
        let i = value[childrenPropName].findIndex(p => p.sort > item.sort);
        if (i == -1) {
          i = value[childrenPropName].length;
        }
        value[childrenPropName].splice(i, 0, item);
      } else {
        value[childrenPropName] = [];
        value[childrenPropName].push(item);
      }
    } else {
      appendTreeNode(value[childrenPropName], item, idPropName, parentPropName, childrenPropName);
    }
  }
}

const deleteFromTree = (list, id, idPropName = "id", childrenPropName = "children") => {
  if (!list || list == null || list.length <= 0)return true;
  for (var i = 0; i < list.length; i++) {
    if (list[i][idPropName] == id) {
      list.splice(i, 1);
      return true;
    } else {
      let result = deleteFromTree(list[i][childrenPropName], id, idPropName, childrenPropName);
      if (result) {
        return result;
      }
    }
  }
  return false;
}

const batchDeleteFromTree = (list, ids, idPropName = "id", childrenPropName = "children") => {
  if (!list || list == null || list.length <= 0)return;
  if (!ids || ids == null || ids.length <= 0)return;
  for (var i = 0; i < list.length; i++) {
    if (ids.findIndex(x => x == list[i][idPropName])>-1) {
      list.splice(i, 1);
      i--;
      continue;
    } else {
      batchDeleteFromTree(list[i][childrenPropName], ids, idPropName, childrenPropName);
    }
  }
}

const updateTreeNode = (list, item, idPropName = "id", childrenPropName = "children") => {
  if (!list || list == null || list.length <= 0) return false;
  for (var i = 0; i < list.length; i++) {
    if (list[i][idPropName] == item[idPropName]) {
      console.log(list[i][idPropName],item[idPropName]);
      list.splice(i, 1, item);
      return true;
    } else {
      let result = updateTreeNode(list[i][childrenPropName], item, idPropName, childrenPropName);
      if (result) {
        return result;
      }
    }
  }
  return false;
}

export default {
  methods: {
    findFromTree,
    appendTreeNode,
    deleteFromTree,
    updateTreeNode,
    batchDeleteFromTree
  }
};
