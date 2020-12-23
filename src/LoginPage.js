import React from "react";


 export default function LoginPage(props) {

  const kakaoUrl ="https://kauth.kakao.com/oauth/authorize?client_id="+process.env.REACT_APP_KAKAO_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/kakao/callback&response_type=code&state=12345";
  const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+process.env.REACT_APP_GOOGLE_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/google/callback&response_type=code&scope=profile&state=12345";
  const facebookUrl = "https://www.facebook.com/v5.0/dialog/oauth?client_id="+process.env.REACT_APP_FACEBOOK_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/facebook/callback&response_type=code&state=12345"
  const naverUrl = "https://nid.naver.com/oauth2.0/authorize?client_id="+process.env.REACT_APP_NAVER_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/naver/callback&response_type=code&state=12345"
  
  const [email,setEmail] = React.useState();
  const [password,setPassword] = React.useState();
  const [checked,setChecked] = React.useState();
  const [severity, setSeverity] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [errMessage, setErrmessage] = React.useState("");
 // const { from } = location.state || { from: { pathname: "/" } };
  //console.log("login props:",props);
  
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	  }
	
	function  alertMessage (message,icon) {
		setErrmessage(message);
		setSeverity(icon);
		setAlertOpen(true);
	}

  const submit = () => {

	   if(email !== undefined && password !== undefined) {
		   axios.post("/auth/login", {id : email, pw : password,})
		    .then(res => {
		        if (res.data.message) {
		        	alert(res.data.message);
		        } else {
		        	
		        	if(res.data.token) {
		        	/*	if(localStorage.getItem('plismplus')){
		        			localStorage.removeItem('plismplus');
		        		}
		        		localStorage.setItem('plismplus',res.data.token);*/
		        		userService.SetItem(res.data);
                //userStore.setUser(res.data.user);
                //userStore.setToken(res.data.token);
                props.onClose(res.data.user);
                

		        	}		        		
		        	 //props.history.push("/");  //alert(res.data.userid + " 占싸깍옙占쏙옙 占쏙옙占쏙옙");
		        }
           // else window.location.href ="/";
           //console.log("loginpage return value:",res);
           //props.isAuthenticated(true);
           
          // props.goBack();
		    })
		    .catch(err => {
            console.log(err);
            if (err.response.data.error) {
              alert(err.response.data.error);
            }
		    })
	   } else {
		   if(email === undefined) {
			   alertMessage('아이디는 필수 입력값 입니다.','error');
		   } else {
			   alertMessage('비밀번호는 필수 입력값 입니다.','error');
		   }
		   
	   }
    
  };
  const clean = () => {
	  //userStore.setUser('');
	  //userStore.setToken('');
  }
  
  const socialReady=() => {
	  alertMessage('서비스 준비중입니다.','info');
  }
  
  const onKeyDownEnter = (event) => {
	  if(event.key === 'Enter') {
		  submit();
		  return;
	  }
  }
  
  return (
    <div>
              <CardHeader style={{textAlignLast:'center'}}>
                <h4 className={classes.cardTitle} style={{fontWeight:'400'}}><font color="black" size="5">로그인</font></h4>
              </CardHeader>
              <CardBody style={{paddingLeft:'10px',paddingRight:'10px'}}>
              	<div style={{marginBottom:'10px'}}>
              		<TextField id="email" label={<font size="2">아이디</font>} onChange={event => setEmail(event.target.value)} variant="outlined" size="small" fullWidth />
                </div>
                <div style={{marginBottom:'5px'}}>
                	<TextField id="password" label={<font size="2">비밀번호</font>} onChange={event => setPassword(event.target.value)} onKeyPress={onKeyDownEnter} variant="outlined" size="small" type="password" fullWidth />
                </div>
				<div style={{textAlignLast:'start',marginBottom:'5px'}}>
	                <Checkbox
	                	checked={checked}
	              		onChange={event => setChecked(event.target.checked)}
	                	color="default"
	                	style={{padding:'0px'}}
	              />로그인 상태 유지
				</div>
                <CardFooter className={classes.justifyContentCenter} style={{marginLeft:'0px',marginRight:'0px',paddingTop:'5px'}}>
                      <Button  color="info" size="lg"  onClick={submit} fullWidth>로그인하기</Button>
				</CardFooter>
                <CardFooter className={classes.justifyContentCenter} style={{marginLeft:'0px',marginRight:'0px',marginBottom:'10px',paddingTop:'0px'}}>
                	<MaterialButton  size="small" style={{lineHeight:'initial',fontWeight:'blod',paddingLeft:'20px',paddingRight:'20px'}} >
                		<Link to="/authpage/register" onClick={clean} style={{color:'black',textDecoration:'underline'}} >회원가입</Link>
                    </MaterialButton>|
                	<MaterialButton  size="small" style={{lineHeight:'initial',fontWeight:'blod',paddingLeft:'20px',paddingRight:'20px'}} >
                    	<Link to="/authpage/findinfo?code=0"  style={{color:'black',textDecoration:'underline'}} {...props}>아이디찾기</Link>
                    </MaterialButton>|
                	<MaterialButton  size="small" style={{lineHeight:'initial',fontWeight:'blod',paddingLeft:'20px',paddingRight:'15px'}} >
                    	<Link to="/authpage/findinfo?code=1"  style={{color:'black',textDecoration:'underline'}} {...props}>비밀번호찾기</Link>
                    </MaterialButton>
                </CardFooter>

				<GridItem xs={12} style={{textAlignLast:'center'}}>
				<p style={{marginBottom:'0'}}>소셜계정으로 로그인하기</p>
				<Button
		          //justIcon
		          color="transparent"
		          className={classes.iconButtons}
		          //href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://www.plismplus.com/auth/kakao/callback&response_type=code&state=12345"
		           href={kakaoUrl} 
		          //onClick={e => this.handleKakao()}
		          style={{padding:'5px'}}
		        >
		        <img src={KakaoIcon} alt="kakaosns" width="40" height="40"></img>
		        </Button>&nbsp;&nbsp;
		        <Button
		          //justIcon
		          color="transparent"
		          href={naverUrl}
		          className={classes.iconButtons}
		          //onClick={socialReady}
		        style={{padding:'5px'}}
		        >
		        <img src={NaverIcon} alt="naversns" width="40" height="40"></img>
		        </Button>&nbsp;&nbsp;
		        <Button
		          //justIcon
		        color="transparent"
		        className={classes.iconButtons}
		        //href={facebookUrl}
		        onClick={socialReady}
		        style={{padding:'5px'}}
		        >
		        <img src={FaceIcon} alt="facesns" width="40" height="40"></img>
		        </Button>&nbsp;&nbsp;
		        <Button
		        //justIcon
		        color="transparent"
		        className={classes.iconButtons}
		        href={googleUrl}
		        style={{padding:'5px'}}
		      >
		        <img src={GoogleIcon} alt="googlesns" width="40" height="40"></img>
		      </Button>
              </GridItem>
              </CardBody>
       	   <Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
   		<Alert 
   			onClose={handleAlertClose}
   			severity={severity}>
   				{errMessage}
   		</Alert>
   	</Snackbar>
    </div>
  );
}
//))

//export default LoginPage;
