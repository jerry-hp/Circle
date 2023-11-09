import React from "react";
import Layout from "../layouts/Main";
import { MyProfile } from "../components";
import { Footer } from "./../components/Footer/index";

function Profile() {
  return (
    <div>
      <Layout>
        <div className="box-border p-5 h-[80vh] ">
          <MyProfile Hphoto="150px" />
        </div>
      </Layout>
    </div>
  );
}

export default Profile;
