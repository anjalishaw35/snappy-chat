import { useEffect } from 'react';
import axios from 'axios';
import { NoMessage } from '../../assets';
import { ApiRoutes } from '../../constants';
import { IMessagesProps } from '../../interfaces';
import { MessagesContainer, MessageWrapper, Message, NoMessagesContent } from '../../components';

function Messages(props: IMessagesProps) {
  const { hideEmojiPicker, currentChat, currentUser, setMessages, messages, scrollRef } = props;

  useEffect(() => {
    getAllMessage();
  }, [currentChat]);

  const getAllMessage = async () => {
    const { data } = await axios.post(ApiRoutes.GET_MESSAGES, {
      from: currentUser?.id,
      to: currentChat?.id,
    });
    setMessages(data);
  }

  return (
    <>
      {messages.length > 0 ? (
        <MessagesContainer onClick={hideEmojiPicker}>
          {messages.map((item) => {
            const { id, fromSelf, message } = item;

            return (
              <MessageWrapper 
                key={id} 
                ref={scrollRef}
                isSended={fromSelf}
              >
                <Message isSended={fromSelf}>
                  {message}
                </Message>
              </MessageWrapper>
            )
          })}
        </MessagesContainer>
      ) : (
        <NoMessagesContent>
          <img src={NoMessage} alt='No message' />
          <p>No messages sent, please type a message and send</p>
        </NoMessagesContent>
      )}
    </>
  )
}

export default Messages;