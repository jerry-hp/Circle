import Layout from "../layouts/Main";
import { RiUserSearchFill } from "react-icons/ri";
import { useQuery } from "react-query";
import { api } from "../libs/api/api";
import { useState } from "react";

function search() {
  const [muncul, setMuncul] = useState(false);
  const [user, setUser] = useState([]);
  const { data } = useQuery("user", async () => {
    const response = await api.get("/users");
    return response.data.users;
  });

  function handleSearch(e: any) {
    console.log(e.target.value);

    const selectedUser = data.filter((item: any) => {
      return item.username.toLowerCase().includes(e.target.value.toLowerCase()) || item.full_name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setUser(selectedUser);
    e.target.value ? setMuncul(true) : setMuncul(false);
  }

  return (
    <div>
      <Layout>
        <div className="box-border p-2 text-yellow-50 w-full">
          <div className="relative w-full h-8 mb-2">
            <RiUserSearchFill className="text-[#008000] " style={{ position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)" }} />
            <input type="text" className="text-[#008000] w-full h-full px-7 bg-white rounded-md text-xl border-2 border-white" onChange={handleSearch} />
          </div>
          {muncul ? (
            user.length === 0 ? (
              <p className="mx-auto">kosong</p>
            ) : (
              user.map((item: any) => (
                <div key={item.id} className="flex items-center gap-1 mb-1">
                  <img className="w-10 h-10 rounded-full" src={item.profile_picture} alt="" />
                  <div>
                    <p>{item.full_name}</p>
                    <p className="text-gray-400">{item.username}</p>
                  </div>
                  <button className="ml-auto border rounded-xl px-5 border-white">Follow</button>
                </div>
              ))
            )
          ) : (
            <p className="mx-auto">Tidak ada pencarian</p>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default search;
