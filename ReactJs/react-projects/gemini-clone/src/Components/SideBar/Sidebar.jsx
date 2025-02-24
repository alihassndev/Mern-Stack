import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <>
      <div className="min-h-[100vh] inline-flex flex-col justify-between bg-[#f0f4f9] p-6">
        <div>
          <img
            className="w-5 block ml-3 cursor-pointer"
            src={assets.menu_icon}
            alt=""
          />
          <div className="mt-3 inline-flex items-center gap-3 p-3 bg-[#e6eaf1] rounded-4xl text-gray-600 cursor-pointer">
            <img className="w-4" src={assets.plus_icon} alt="" />
            <p>New Chat</p>
          </div>
          <div>
            <p>Recent</p>
            <div>
              <img className="w-5" src={assets.message_icon} alt="" />
              <p>What is react ...</p>
            </div>
          </div>
        </div>

        <div>
          <div>
            <img className="w-5" src={assets.question_icon} alt="" />
            <p>Help</p>
          </div>
          <div>
            <img className="w-5" src={assets.history_icon} alt="" />
            <p>Activity</p>
          </div>
          <div>
            <img className="w-5" src={assets.setting_icon} alt="" />
            <p>Settings</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
