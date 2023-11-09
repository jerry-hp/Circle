import { useState } from "react";
import Layout from "../layouts/Main";
import "../tailwind.css";
import { api } from "../libs/api/api";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

function Follows() {
  const [isTab, setIsTab] = useState(true);
  const [isTek, setIsTek] = useState(true);
  const full_name = useSelector((item: any) => item.auth.full_name);
  const userId = useSelector((item: any) => item.auth.id);

  //get follow
  const { data: follo, refetch } = useQuery("follow", async () => {
    const response = await api.get("/follows");
    return response.data.follow;
  });
  const follow = follo ? follo : [];

  //get followers
  const filteredFollowers = follow.filter((item: any) => {
    return item.following_id.full_name == full_name;
  });

  //get following
  const filteredFollowing = follow.filter((item: any) => {
    return item.follower_id.full_name == full_name;
  });

  //button follow or not
  const isFollow = filteredFollowing.map((item: any) => {
    return item.following_id.username;
  });

  //post follow sampai sini
  async function handleFollow(e: number) {
    const following = e;
    console.log("masuk function follow");
    const dataFollow = {
      follower_id: userId,
      following_id: following,
    };
    await api.post("/follow", dataFollow);
    refetch();
  }

  async function handleUnfollow(id: any) {
    const filterId = follow.filter((item: any) => item.following_id.id == id && item.follower_id.id == userId);
    const idFollow = filterId[0].id;

    await api.delete("/follow", { data: idFollow });
    isTek ? setIsTek(false) : setIsTek(true);
  }

  return (
    <div>
      <Layout>
        <div className="box-border px-3 p-gray-200 grid gap-y-2">
          <h1 className="text-2xl col-span-2 text-[#008000]">Follows</h1>
          <button style={{ color: isTab ? "#008000" : "white", borderBottom: isTab ? "2px solid #008000" : "2px solid white" }} className="col-span-1 " onClick={() => setIsTab(true)}>
            Followers
          </button>
          <button
            style={{ color: !isTab ? "#008000" : "white", borderBottom: !isTab ? "2px solid #008000" : "2px solid white" }}
            className="col-span-1  focus:text-[#008000] border-b-2 focus:border-[#008000]"
            onClick={() => setIsTab(false)}
          >
            Following
          </button>
          <div className="col-span-2">
            {isTab ? (
              <>
                {filteredFollowers.map((item: any, key: number) => (
                  <div key={key} className="h-10 grid grid-cols-10 grid-rows-2 grid-flow-col place-items-start text-yellow-50 mb-3">
                    <img src={item.follower_id.profile_picture} alt="" className="w-10 h-full rounded-full row-span-2" />
                    <p className="col-span-10">{item.follower_id.full_name}</p>
                    <p className="col-span-10 text-gray-400"> {item.follower_id.username}</p>
                    <div className="row-span-2 h-full flex items-center">
                      {isFollow[key] === item.follower_id.username ? (
                        <button key={key} className="border rounded-full border-white px-4 h-[70%] " onClick={() => handleUnfollow(item.follower_id.id)}>
                          {isTek ? "Unfollow" : "Follow"}
                        </button> // dikit lagi selesai perbaiki unfollow dulu
                      ) : (
                        <button key={key + 3000} className="border rounded-full border-white px-4 h-[70%] " onClick={() => handleFollow(item.follower_id.id)}>
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div>
                {filteredFollowing.map((item: any, key: number) => (
                  <div key={key} className="h-10 grid grid-cols-10 grid-rows-2 grid-flow-col place-items-start text-yellow-50 mb-2">
                    <img src={item.following_id.profile_picture} alt="" className="w-10 h-full rounded-full row-span-2" />
                    <p className="col-span-10">{item.following_id.full_name}</p>
                    <p className="col-span-10 text-gray-400">{item.following_id.username}</p>
                    <div className="row-span-2 h-full flex items-center">
                      <button className="border rounded-full border-gray-400 text-gray-400 px-4 h-[70%]">Following</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Follows;
