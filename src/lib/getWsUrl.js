export default function getWsUrl(wsServer, queueId, anonId) {
  return `wss://${wsServer}/queue/${queueId}?token=${anonId}`;
}