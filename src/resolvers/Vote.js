export function voteLink(parent, args, context) {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).link();
}

export function voteUser(parent, args, context) {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
}
