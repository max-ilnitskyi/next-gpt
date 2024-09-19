export class MessageApiPath {
  static index() {
    return 'messages';
  }
  static create() {
    return 'messages';
  }
  static delete(messageId: number) {
    return `messages/${messageId}`;
  }
  static example() {
    return 'messages/example_messages';
  }
  static count() {
    return 'messages/count';
  }
  static generateContent() {
    return 'messages/generate_content';
  }
}
