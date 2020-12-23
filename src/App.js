import logo from './logo.svg';
import './App.css';
import { Button, ButtonToolbar } from 'react-bootstrap';

function App() {
  // const kakaoUrl ="https://kauth.kakao.com/oauth/authorize?client_id="+process.env.REACT_APP_KAKAO_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/kakao/callback&response_type=code&state=12345";
  // const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+process.env.REACT_APP_GOOGLE_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/google/callback&response_type=code&scope=profile&state=12345";
  // const facebookUrl = "https://www.facebook.com/v5.0/dialog/oauth?client_id="+process.env.REACT_APP_FACEBOOK_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/facebook/callback&response_type=code&state=12345"
  const naverUrl = "https://nid.naver.com/oauth2.0/authorize?client_id=NWmVhSRrehwwXj3hCkaD&redirect_uri=http://localhost:5000/auth/naver/callback&response_type=code&state=12345"
  

  return (
    <div className="App">
      <ButtonToolbar>
        <Button href={naverUrl} variant="primary">Naver</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="info">Info</Button>
        <Button variant="light">Light</Button>
        <Button variant="dark">Dark</Button>
        <Button variant="link">Link</Button>
      </ButtonToolbar>
    </div>
  );
}

export default App;
