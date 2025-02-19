// app.js

let currentUser = null; // Holds the current user's profile

// Save user profile to local storage
document.getElementById('saveProfile').onclick = () => {
    const name = document.getElementById('name').value;
    const skills = document.getElementById('skills').value.split(',');
    const interests = document.getElementById('interests').value.split(',');

    currentUser = { name, skills, interests };
    localStorage.setItem('profile', JSON.stringify(currentUser));

    alert('Profile saved successfully!');
};

// Find matches based on skills and interests
document.getElementById('findMatch').onclick = () => {
    const skillsSearch = document.getElementById('searchSkills').value.split(',');
    const interestsSearch = document.getElementById('searchInterests').value.split(',');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matches = users.filter(user =>
        user.skills.some(skill => skillsSearch.includes(skill)) &&
        user.interests.some(interest => interestsSearch.includes(interest))
    );

    const matchResults = document.getElementById('matchResults');
    matchResults.innerHTML = '';
    matches.forEach(match => {
        const matchDiv = document.createElement('div');
        matchDiv.innerHTML = `Name: ${match.name}, Skills: ${match.skills.join(', ')}, Interests: ${match.interests.join(', ')}`;
        const chatButton = document.createElement('button');
        chatButton.innerText = 'Chat';
        chatButton.onclick = () => startChat(match);
        matchDiv.appendChild(chatButton);
        matchResults.appendChild(matchDiv);
    });
};

// Start chat functionality
function startChat(match) {
    document.getElementById('sendMessage').onclick = () => {
        const message = document.getElementById('messageInput').value;
        const chatWindow = document.getElementById('chatWindow');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `You: ${message}`;
        chatWindow.appendChild(messageDiv);

        // Simulate receiving a response
        const responseDiv = document.createElement('div');
        responseDiv.textContent = `${match.name}: Thank you!`;
        chatWindow.appendChild(responseDiv);
    };
}

// WebRTC: Start Audio Call
document.getElementById('audioCall').onclick = () => {
    startCall('audio');
};

// WebRTC: Start Video Call
document.getElementById('videoCall').onclick = () => {
    startCall('video');
};

function startCall(type) {
    if (!currentUser) {
        alert('Please save your profile first!');
        return;
    }

    // Simulate peer connection setup (WebRTC)
    const peerConnection = new RTCPeerConnection();

    // Video/Audio Stream (dummy example, real implementation requires capturing media)
    const localStream = new MediaStream();
    const videoElement = document.createElement('video');
    document.body.appendChild(videoElement);
    videoElement.srcObject = localStream;

    peerConnection.addStream(localStream);

    peerConnection.createOffer().then(offer => {
        peerConnection.setLocalDescription(offer);
    });

    peerConnection.onaddstream = event => {
        const remoteStream = event.stream;
        const remoteVideo = document.createElement('video');
        remoteVideo.srcObject = remoteStream;
        document.body.appendChild(remoteVideo);
        remoteVideo.play();
    };

    // Display a message about the call type (audio or video)
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} call started!`);
}

// Store users in local storage for demo purposes (you can modify this to add users manually)
if (!localStorage.getItem('users')) {
    const dummyUsers = [
        { name: 'John', skills: ['coding', 'design'], interests: ['music', 'reading'] },
        { name: 'Jane', skills: ['painting', 'coding'], interests: ['sports', 'music'] }
    ];
    localStorage.setItem('users', JSON.stringify(dummyUsers));
}
