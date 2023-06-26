import styled from "styled-components";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineQuestionCircle,
  AiFillGift,
  AiOutlineUser,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {
  BsSearch,
  BsMoonStarsFill,
  BsFillSunFill,
  BsBoxSeam,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsCart3,
  BsFillTrashFill,
} from "react-icons/bs";
import { IoIosArrowForward, IoIosArrowBack, IoIosImages } from "react-icons/io";
import { GiBackwardTime } from "react-icons/gi";
import { MdFavoriteBorder, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TfiPencilAlt } from "react-icons/tfi";
import { TbTruckDelivery } from "react-icons/tb";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { GrFormClose } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";

const StyledIcon = (Icon) => styled(Icon)`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 8px;
  top: 25%;
  cursor: pointer;
  z-index: 1;
  color: ${(props) => props.theme.text};
`;

export const AiFillEyeInvisibles = StyledIcon(AiFillEyeInvisible);
export const AiFillEyes = StyledIcon(AiFillEye);

export const StyledIconGoogle = styled(FcGoogle)`
  width: 35px;
  height: 35px;
  filter: saturate(1.5);
  cursor: pointer;
`;
export const BsSearchs = styled(BsSearch)`
  color: white;
  cursor: pointer;
`;

const StyledSunMoon = (Icon) => styled(Icon)`
  color: #ffffff;
  cursor: pointer;
  margin: 2px 0 0 0;
`;

export const BsFillSunFills = StyledSunMoon(BsFillSunFill);
export const BsMoonStarsFills = StyledSunMoon(BsMoonStarsFill);

const Arrows = (Icon) => styled(Icon)`
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
`;

export const IoIosArrowRight = Arrows(IoIosArrowForward);
export const IoIosArrowLeft = Arrows(IoIosArrowBack);

const Arrows2 = (Icon) => styled(Icon)`
  width: 20px;
  height: 20px;
  color: ${(props) => props.theme.text};
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

export const IoIosArrowRightXs = Arrows2(IoIosArrowForward);
export const IoIosArrowLeftXs = Arrows2(IoIosArrowBack);

const IconPromises = (Icon) => styled(Icon)`
  width: 48px;
  height: 48px;
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

export const BsBoxSeams = IconPromises(BsBoxSeam);
export const GiBackwardTimes = IconPromises(GiBackwardTime);
export const AiOutlineQuestionCircles = IconPromises(AiOutlineQuestionCircle);

const IconSocial = (Icon) => styled(Icon)`
  width: 20px;
  height: 20px;
  color: white;
  cursor: pointer;
`;

export const BsFacebooks = IconSocial(BsFacebook);
export const BsTwitters = IconSocial(BsTwitter);
export const BsInstagrams = IconSocial(BsInstagram);

const IconNav = (Icon) => styled(Icon)`
  width: 20px;
  height: 20px;
  color: ${(props) => props.theme.icon2};
  cursor: pointer;
`;

export const MdFavoriteBorders = IconNav(MdFavoriteBorder);
export const BsCart3s = IconNav(BsCart3);

const IconArrow = (Icon) => styled(Icon)`
  width: 20px;
  height: 20px;
  color: #e30613;
  cursor: pointer;
`;

export const MdArrowDown = IconArrow(MdOutlineKeyboardArrowDown);

export const BsFillTrashFills = IconNav(BsFillTrashFill);

export const IconUploadImg = styled(IoIosImages)`
  width: 60px;
  height: 60px;
  color: ${(props) => props.theme.icon2};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export const TfiPencilAlts = styled(TfiPencilAlt)`
  width: 20px;
  height: 20px;
  color: green;
`;

const Icon = (Icon) => styled(Icon)`
  width: 20px;
  height: 20px;
  color: #e30613;
`;
const Icon2 = (Icon) => styled(Icon)`
  width: 24px;
  height: 28px;
  color: #e30613;
`;

export const GrFormCloses = styled(GrFormClose)`
  width: 24px;
  height: 28px;
  color: #fff;
  cursor: pointer;
  filter: contrast(0);
`;

const Icon3 = (Icon) => styled(Icon)`
  width: 25px;
  height: 25px;
  color: ${(props) => props.theme.text};
`;
export const IoLocationOutlines = Icon(IoLocationOutline);
export const AiOutlineUsers = Icon3(AiOutlineUser);

export const AiFillGifts = Icon(AiFillGift);
export const BsFillTrashFillS = Icon(BsFillTrashFill);
export const TbTruckDeliverys = Icon2(TbTruckDelivery);
export const HiArrowUturnLefts = Icon2(HiArrowUturnLeft);

// export const GiBackwardTimes = IconPromises(GiBackwardTime);
// export const AiOutlineQuestionCircles = IconPromises(AiOutlineQuestionCircle);

// import styled from "styled-components";
// import {
//   AiFillEyeInvisible,
//   AiFillEye,
//   FcGoogle,
//   BsSearch,
//   BsMoonStarsFill,
//   BsFillSunFill,
//   IoIosArrowForward,
//   IoIosArrowBack,
// } from "react-icons/all";

// const StyledIcon = styled.span`
//   width: 20px;
//   height: 20px;
//   position: absolute;
//   right: 8px;
//   top: 25%;
//   cursor: pointer;
//   z-index: 1;
//   color: ${(props) => props.theme.text};
// `;

// const Arrows = styled.span`
//   width: ${(props) => props.size || 40}px;
//   height: ${(props) => props.size || 40}px;
//   color: #ffffff;
//   cursor: pointer;
// `;

// const Arrows2 = styled(Arrows)`
//   width: ${(props) => props.size || 20}px;
//   height: ${(props) => props.size || 20}px;
//   &:hover {
//     color: red;
//   }
// `;

// export const AiFillEyeInvisibles = styled(AiFillEyeInvisible)`
//   ${StyledIcon}
// `;

// export const AiFillEyes = styled(AiFillEye)`
//   ${StyledIcon}
// `;

// export const StyledIconGoogle = styled(FcGoogle)`
//   width: 35px;
//   height: 35px;
//   filter: saturate(1.5);
//   cursor: pointer;
// `;

// export const BsSearchs = styled(BsSearch)`
//   color: white;
//   cursor: pointer;
// `;

// const SunMoon = styled.span`
//   color: #ffffff;
//   cursor: pointer;
//   margin: 2px 0 0 0;
// `;

// export const BsFillSunFills = styled(BsFillSunFill)`
//   ${SunMoon}
// `;

// export const BsMoonStarsFills = styled(BsMoonStarsFill)`
//   ${SunMoon}
// `;

// export const IoIosArrowRight = styled(IoIosArrowForward)`
//   ${Arrows}
// `;

// export const IoIosArrowLeft = styled(IoIosArrowBack)`
//   ${Arrows}
// `;

// export const IoIosArrowRightXs = styled(IoIosArrowForward)`
//   ${Arrows2}
// `;

// export const IoIosArrowLeftXs = styled(IoIosArrowBack)`
//   ${Arrows2}
// `;
