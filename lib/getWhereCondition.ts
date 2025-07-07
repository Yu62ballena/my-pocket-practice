function getWhereCondition(listtype: string, userId: string) {
  switch (listtype) {
    case "all":
      return { userId };
    case "liked":
      return { userId, isLiked: true };
    case "archived":
      return { userId, isArchived: true };
    default:
      return { userId, isArchived: false };
  }
}

export default getWhereCondition;
