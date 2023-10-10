import { PrettyChatWindow } from "react-chat-engine-pretty";
import "./chats.css";
import {
  ChatEngine,
  ChatList,
  ChatCard,
  NewChatForm,
  ChatFeed,
  ChatHeader,
  IceBreaker,
  MessageBubble,
  IsTyping,
  NewMessageForm,
  ChatSettings,
  ChatSettingsTop,
  PeopleSettings,
  PhotosSettings,
  OptionsSettings,
} from "react-chat-engine";
import { MultiChatWindow } from "react-chat-engine-advanced";

import "./chat.scss"
const ChatsPage = (props) => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId={"97427ae2-0fef-4442-844f-334b554421da"}
        username="mohannad " // adam
        secret={"erer12345"} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;
