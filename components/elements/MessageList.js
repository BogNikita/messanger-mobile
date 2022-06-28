import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import MessageItem from './MessageItem';

const MessageList = ({ userName }) => {
  const { messages } = useSelector(state => state.chat.chat);
  return (
    <ScrollView style={styles.MessageField}>
      {messages.map((item, i) => (
        <MessageItem key={i} {...item} userName={userName} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MessageField: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 10,
  },
});

export default React.memo(MessageList);
