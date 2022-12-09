import { async } from "@firebase/util";
import axios from "axios";

//call api
const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {}
};

//call api user (xem danh sách users)
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return res.data;
  } catch (error) {
    return null;
  }
};

//call api user (xem danh sách artisrt)
export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artists/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

//call api user (xem danh sách albums)
export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/albums/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

//call api user (xem danh sách songs)
export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

//call api update role của user
export const changingUserRole = async (userId, role) => {
  try {
    const res = axios.put(`${baseURL}api/users/updateRole/${userId}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};

//call api delete user
export const removeUser = async (userId) => {
  try {
    const res = axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};

//call save bài hát mới
export const saveNewSong = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/songs/save`, { ...data });
    return (await res).data.savedSong;
  } catch (error) {
    return null;
  }
};

//call save artist mới
export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/artists/save`, { ...data });
    return (await res).data.savedArtist;
  } catch (error) {
    return null;
  }
};

//call save Album
export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/albums/save`, { ...data });
    return (await res).data.savedAlbum;
  } catch (error) {
    return null;
  }
};

//call delete Song
export const deleteSongById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/songs/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

//call delete Artist
export const deleteArtistById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/artists/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

//call delete Album
export const deleteAlbumById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/albums/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

//call api user (xem danh sách fauvorites)
export const getFavourites = async (id) => {
  try {
    const res = await axios.get(`${baseURL}api/songs/user/${id}`);
    console.log(res);
    return res.data;
  } catch (error) {
    return null;
  }
};
export const addFavourites = async (data) => {
  console.log("data", data);
  let dataAdd = {
    _id: data.id_user,
  };
  try {
    const res = await axios.post(
      `${baseURL}api/songs/fauvorites/${data.id_music}`,
      dataAdd
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
export const deleteFavourites = async (data) => {
  console.log("data", data);
  let dataAdd = {
    _id: data.id_user,
  };
  try {
    const res = await axios.post(
      `${baseURL}api/songs/fauvoritesdetele/${data.id_music}`,
      dataAdd
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
export const addPlayList = async (data) => {
  console.log("data", data);
  let dataAdd = {
    _id: data.id_user,
  };
  try {
    const res = await axios.post(
      `${baseURL}api/songs/playlist/${data.id_music}`,
      dataAdd
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
export const deletePlaylist = async (data) => {
  console.log("data", data);
  let dataAdd = {
    _id: data.id_user,
  };
  try {
    const res = await axios.post(
      `${baseURL}api/songs/playlistdetele/${data.id_music}`,
      dataAdd
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

export const searchNameSong = async (data) => {
  let dataAdd = {
    valueSearch: data,
  };

  try {
    const res = await axios.post(`${baseURL}api/songs/search/`, dataAdd);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getrank = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/rank/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const addlistens = async (id) => {
  try {
    const res = await axios.post(`${baseURL}api/songs/addlistens/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const login = async (email, password) => {
  try {
    let dataAdd = {
      email: email,
      password: password,
    };
    const res = await axios.post(`${baseURL}api/users/logine`, dataAdd);
    return res.data;
  } catch (error) {
    return alert(error.response.data.message);
  }
};

export const register = async (email, password, name, role) => {
  try {
    let dataAdd = {
      email: email,
      password: password,
      role: role,
      name: name,
    };
    const res = await axios.post(`${baseURL}api/users/register`, dataAdd);
    return res.data;
  } catch (error) {
    return alert(error.response.data.message);
  }
};

export const getrole = async (tokene) => {
  try {
    const res = await axios.post(`${baseURL}api/users/role`, {},{
      headers: {
        token: "Bearer "+tokene,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getinfor = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}api/users/getoneuser/${id}`
    );
    return res.data;
  } catch (error) {
    return null;
  }
}

export const getAllsonginalbum = async (data) => {
  try {
    let dataAdd = {
      namealbum: data,
    };
    const res = await axios.post(
      `${baseURL}api/albums/getallsonginalbum`,
      dataAdd
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
