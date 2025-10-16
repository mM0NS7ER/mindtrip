export default interface Message {
  role: "user" | "ai";
  text: string;
}
