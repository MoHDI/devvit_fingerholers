import './createPost.js';
import { Devvit, useState } from '@devvit/public-api';


// Defines the messages that are exchanged between Devvit and Web View
type WebViewMessage =
  | {
      type: 'initialData';
      data: { username: string; currentCounter: number };
    }
  | {
      type: 'setCounter';
      data: { newCounter: number };
    }
  | {
      type: 'updateCounter';
      data: { currentCounter: number };
    };

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Add a custom post type to Devvit
Devvit.addCustomPostType({
  name: 'Fingerholers Game',
  height: 'regular',
  render: (context) => {
    // Load username with `useAsync` hook
    const [username] = useState(async () => {
      const currUser = await context.reddit.getCurrentUser();
      return currUser?.username ?? 'anon';
    });

    // Load latest counter from redis with `useAsync` hook
    const [counter, setCounter] = useState(async () => {
      const redisCount = await context.redis.get(`counter_${context.postId}`);
      return Number(redisCount ?? 0);
    });

    // Create a reactive state for web view visibility
    const [webviewVisible, setWebviewVisible] = useState(false);

    // When the web view invokes `window.parent.postMessage` this function is called
    const onMessage = async (msg: WebViewMessage) => {
      switch (msg.type) {
        case 'setCounter':
          await context.redis.set(`counter_${context.postId}`, msg.data.newCounter.toString());
          context.ui.webView.postMessage('myWebView', {
            type: 'updateCounter',
            data: {
              currentCounter: msg.data.newCounter,
            },
          });
          setCounter(msg.data.newCounter);
          break;
        case 'initialData':
        case 'updateCounter':
          break;

        default:
          throw new Error(`Unknown message type: ${msg satisfies never}`);
      }
    };

    // When the button is clicked, send initial data to web view and show it
    const onShowWebviewClick = () => {
      setWebviewVisible(true);
      context.ui.webView.postMessage('myWebView', {
        type: 'initialData',
        data: {
          username: username,
          currentCounter: counter,
        },
      });
    };

    // Render the custom post type
    return (
      
      <zstack
      // height={webviewVisible ? '0%' : '100%'}
      height='100%'
      width='100%'
      alignment="middle center">
        {/* Background Image */}
      <image
      url="club_400x240.png"
      width="100%"
      height="100%"
      imageWidth="400px"
      imageHeight="240px"
      resizeMode="cover"
      
    />

        <vstack
          grow={!webviewVisible}
          height={webviewVisible ? '0%' : '100%'}
          alignment="bottom center"
              width='100%'
          // border="thick"
          padding='large'
        >
          {/* <text size="xlarge" weight="bold">
            Fingerholers!
          </text> */}
         
          <vstack>
          <button size="large"  onPress={onShowWebviewClick}>Play Fingerholers Game</button>
         </vstack>
        </vstack>
        <vstack grow={webviewVisible} height={webviewVisible ? '100%' : '0%'}     width='100%'>
          <vstack border="none" backgroundColor='gray' borderColor="black" height={webviewVisible ? '100%' : '0%'} grow width='100%'  alignment="middle center" >
            <webview
              id="myWebView"
              // url="page_temp.html"
             url="game/index.html"
              onMessage={(msg) => onMessage(msg as WebViewMessage)}
              grow
              // height={webviewVisible ? '100%' : '0%'}
              width={webviewVisible ? '100%' : '0%'}
            />
            {/* <text size="xlarge" weight="bold">Fingerholers</text> */}
          </vstack>
        </vstack>
      </zstack>
    );
  },
  
});



export default Devvit;
