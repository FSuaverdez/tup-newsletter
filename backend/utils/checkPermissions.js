export const havePermissionsCategory = (user, category) => {
  if (user.isAdmin) return true;
  return category.userPermissions.find(
    p => p.user._id.toString() == user._id.toString()
  ).role === 'Admin'
    ? true
    : false;
};

export const havePermissionsSubCategory = (user, subCategory) => {
  if (user.isAdmin) return true;

  console.log(subCategory);
  console.log(subCategory.userPermissions);
  return subCategory.userPermissions.find(
    p => p.user._id.toString() == user._id.toString()
  ).role === 'Admin'
    ? true
    : false;
};

