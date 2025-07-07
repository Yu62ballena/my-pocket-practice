function getSearchWhereCondition(keyword: string, userId: string) {
  const whereCondition = {
    userId,
    isArchived: false,
    OR: [
      { title: { contains: keyword } },
      { siteName: { contains: keyword } },
      { description: { contains: keyword } },
      { content: { contains: keyword } },
    ],
  };

  return whereCondition;
}

export default getSearchWhereCondition;
