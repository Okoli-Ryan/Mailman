import { Auth, Db, FieldValue } from '../services/firebase';
const dbChatroom = Db.collection('chatrooms');
const dbUsers = Db.collection('users');

export const createChatRoom = (payload) => {
	return (dispatch, getState) => {
		function createChatRoomFunc() {
			let date = Date.now();
			dbChatroom
				.doc(payload.roomName)
				.set({
					authUsers: [Auth.currentUser.email],
					messages: {
						[`data${date}`]: {
							sender: 'notification',
							key: 'data' + date,
							text: `${payload.roomName} has been created`,
							timestamp: FieldValue.serverTimestamp(),
						},
					},
					public: payload.public,
				})
				.then(() => {
					//add room name to Auth.currentUser doc
					dbUsers.doc(Auth.currentUser.email).update({
						rooms: FieldValue.arrayUnion(payload.roomName),
					});
				})
				//change current room on redux
				.then(() => {
					dispatch({ type: 'set-current-room', payload: payload.roomName });
				})
				//error in updating messages field
				.catch((err) => {
					dispatch({ type: 'loading-false' });
					console.log(err);
					dispatch({
						type: 'set-current-room',
						payload: getState().menuBarReducer,
					});
					dispatch({
						type: 'show-error-modal',
						message: 'Could not create room, check your internet connection',
					});
				});
		}

		dispatch({ type: 'loading-true' });
		dbChatroom
			.doc(payload.roomName)
			.get()
			.then((doc) => {
				//if doc doesnt exist, create it
				if (!doc.exists) {
					createChatRoomFunc();
				} else {
					//if document exists, show join modal
					dispatch({ type: 'hide' });
					dispatch({ type: 'set', payload: payload.roomName });
					dispatch({ type: 'loading-false' });
					dispatch({
						type: 'show-join-modal',
					});
				}
			})
			//error in checking if doc exists
			.catch((e) => {
				console.log(e);
				dispatch({ type: 'loading-false' });
				dispatch({ type: 'hide' });
				dispatch({
					type: 'show-error-modal',
					message: 'An error occurred, check your internet connection',
				});
				dispatch({
					type: 'set-current-room',
					payload: getState().menuBarReducer,
				});
			});
	};
};

export const joinChatRoom = (payload) => {
	return (dispatch, getState) => {
		dispatch({ type: 'loading-true' });
		dbChatroom
			.doc(payload.roomName)
			.get()
			.then((doc) => {
				let date = Date.now();
				//if room exists, join it
				if (doc.exists) {
					dbChatroom
						.doc(payload.roomName)
						.get()
						.then((doc) => {
							const data = doc.data();
							if (data.authUsers.includes(Auth.currentUser.email)) {
								dispatch({ type: 'set-current-room', payload: payload.roomName });
							} else if (data.public === true) {
								dbChatroom
									.doc(payload.roomName)
									.update({
										authUsers: FieldValue.arrayUnion(Auth.currentUser.email),
										[`messages.data${date}`]: {
											sender: 'notification',
											text: `${Auth.currentUser.email} has been added to the group`,
											timestamp: FieldValue.serverTimestamp(),
											key: 'data' + date,
										},
									})
									.then(() => {
										dbUsers
											.doc(Auth.currentUser.email)
											.update({
												rooms: FieldValue.arrayUnion(payload.roomName),
											});
									})
									.then(() => {
										console.log('joined');
										dispatch({
											type: 'set-current-room',
											payload: payload.roomName,
										});
									})
									.catch((err) => {
										console.log(err);
										dispatch({
											type: 'set-current-room',
											payload: getState().menuBarReducer,
										});
										dispatch({ type: 'loading-false' });
										dispatch({
											type: 'show-error-modal',
											message:
												'Could not join room, check your internet connection',
										});
										dispatch({ type: 'hide' });
									});
							} else {
								dispatch({ type: 'loading-false' });
								dispatch({
									type: 'set-current-room',
									payload: getState().menuBarReducer,
								});
								dispatch({
									type: 'show-error-modal',
									message: 'Private Room, invite only',
								});
								dispatch({ type: 'hide' });
							}
						});
				} else {
					dispatch({ type: 'set', payload: payload.roomName });
					dispatch({ type: 'loading-false' });
					dispatch({ type: 'show-create-modal' });
					dispatch({ type: 'hide' });
				}
			})
			.catch((e) => {
				console.log(e);
				dispatch({ type: 'loading-false' });
				dispatch({
					type: 'set-current-room',
					payload: getState().menuBarReducer,
				});
				dispatch({
					type: 'show-error-modal',
					message: 'Could not join room, check your internet connection',
				});
				dispatch({ type: 'hide' });
			});
	};
};

export const addUserToRoom = (payload) => {
	return (dispatch, getState) => {
		let date = Date.now();
		dbChatroom
			.doc(getState().menuBarReducer)
			.update({
				authUsers: FieldValue.arrayUnion(payload.username),
				[`messages.data${date}`]: {
					sender: 'notification',
					text: `${payload.username} has been added to the group`,
					timestamp: FieldValue.serverTimestamp(),
					key: 'data' + date,
				},
			})
			.then(() => {
				dbUsers.doc(payload.username).update({
					rooms: FieldValue.arrayUnion(getState().menuBarReducer),
				});
			})
			.then(() => {
				console.log('Auth.currentUser added');
			})
			.catch((err) => {
				dispatch({ type: 'loading-false' });
				dispatch({
					type: 'show-error-modal',
					message: 'Could not add User to Room, check your internet connection',
				});
			});
	};
};

export const addFriend = (payload) => {
	return (dispatch, getState) => {
		dbUsers
			.doc(payload)
			.get()
			.then((doc) => {
				if (doc.exists) {
					dbUsers.doc(Auth.currentUser.email).update({
						friends: FieldValue.arrayUnion(payload),
					});
				} else {
					dispatch({ type: 'show-error-modal', message: 'User does not exist' });
				}
			})
			.catch(() => {
				dispatch({
					type: 'show-error-modal',
					message: 'Coudl not save friend contact, check your internet connection',
				});
			});
	};
};

export const setCurrentRoom = (payload) => {
	return {
		type: 'set-current-room',
		payload,
	};
};
