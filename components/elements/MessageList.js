import React, { useRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import MessageItem from './MessageItem';

const MessageList = ({ userName, messages }) => {
  const scrollViewRef = useRef();
  return (
    <ScrollView
      style={styles.MessageField}
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}>
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
