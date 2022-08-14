export const getUserAccessTokenData = (askForConsent: boolean) =>{
    return new Promise((resolve) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = e => resolve(e.data);
        window.parent.postMessage({
            type: "GetUserTokenRequest",
            permissionScope: "global:Profile.View global:Profile.Memberships.View",
            askForConsent: askForConsent
        }, "*", [channel.port2]);
    });
}

export const populateTeammateList = (userTokenData: any) => {
    const userToken = userTokenData.token;
    const serverUrl = userTokenData.serverUrl;
    return fetch(serverUrl + '/api/http/team-directory/memberships?profiles=me', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + userToken,
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
                const teamId = data.data[0].team.id;
                fetch(serverUrl + '/api/http/team-directory/memberships?teams=' + teamId + '&\$fields=data(member(username,name))', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + userToken,
                        'Accept': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        return data;
                            /*document.getElementById("authorize-button").style.display = "none";
                            const memberships = data.data;
                            const teammateListDiv = document.getElementById("teammate-list");
                            const ol = document.createElement("p");
                            teammateListDiv.appendChild(ol);

                            memberships.forEach((membership: any, index: number) => {
                                const name = membership.member.name;
                                const teammateText = document.createTextNode(name.firstName + ' ' + name.lastName);
                                const li = document.createElement("li");
                                li.appendChild(teammateText);
                                teammateListDiv.appendChild(li);
                            });*/
                        }
                    );
            }
        );
}