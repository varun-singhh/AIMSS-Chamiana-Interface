import axios from "axios";
import ProgressBar from "@badrap/bar-of-progress";
import Cookies from "js-cookie";

export const formServiceBaseURl = "http://localhost:8001/api/";

export const authBaseURL = "http://localhost:9001/api/";

export const userServiceBaseURL = "http://localhost:8000/";

export const setAuthToken = (): void => {
  var token = Cookies.get("token");
  if (token) {
    // If token exists, set it as Authorization header with Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // If no token, remove the Authorization header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getDateFromString = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const progress = new ProgressBar({
  size: 4,
  color: "#0384fc",
  className: "z-50",
  delay: 100,
});

export const clearCookie = () => {
  const cookies = Cookies.get();
  Object.keys(cookies).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
};

const districtToBlockMap = [
  {
    BILASPUR: ["GHUMARWIN-I", "GHUMARWIN-II", "JHANDUTTA", "SADAR", "SWARGHAT"],
    CHAMBA: [
      "BANIKHET",
      "BHARMOUR",
      "CHAMBA",
      "CHOWARI",
      "GAROLA",
      "GEHRA",
      "HARDASPURA",
      "KALHEL",
      "KIANI",
      "MEHLA",
      "PANGI",
      "SALOONI",
      "SIHUNTA",
      "SUNDLA",
      "TISSA",
    ],
    HAMIRPUR: [
      "BHORANJ",
      "BIJHARI",
      "GALORE",
      "HAMIRPUR",
      "NADAUN",
      "SUJANPUR",
    ],
    KANGRA: [
      "BAIJNATH",
      "BHAWARNA",
      "CHADHIAR",
      "DADASIBA",
      "DEHRA",
      "DHARAMSALA",
      "FATEHPUR",
      "INDORA",
      "JAWALI",
      "KANGRA",
      "LAMBAGAON",
      "NAGROTA BAGWAN",
      "NAGROTA SURIAN",
      "NURPUR",
      "PALAMPUR",
      "PANCHRUKHI",
      "RAIT",
      "RAJA KA TALAB",
      "RAKKAR",
    ],
    KINNAUR: ["KALPA", "NICHAR", "POOH"],
    KULLU: ["ANNI", "BANJAR", "KULLU/1", "KULLU/2", "NAGGAR", "NIRMAND"],
    "LAHUL&SPITI": ["KAZA", "KEYLONG/1", "KEYLONG/2", "UDAIPUR"],
    MANDI: [
      "AUT",
      "BALH",
      "CHACHIOT/1",
      "CHACHIOT/2",
      "CHAUNTRA/1",
      "CHAUNTRA/2",
      "DHARAMPUR/1",
      "DHARAMPUR/2",
      "DRANG/1",
      "DRANG/2",
      "GOPALPUR/1",
      "GOPALPUR/2",
      "KARSOG/1",
      "KARSOG/2",
      "SADAR/1",
      "SADAR/2",
      "SAIGALOO",
      "SERAJ/1",
      "SERAJ/2",
      "SUNDERNAGAR/1",
      "SUNDERNAGAR/2",
    ],
    SHIMLA: [
      "CHAUHARA",
      "CHOPAL",
      "DEHA",
      "DODRAKAWAR",
      "JUBBAL",
      "KASUMPATI",
      "KOTKHAI",
      "KUMARSAIN",
      "KUPVI",
      "MASHOBRA",
      "MATIANA",
      "NANKHARI",
      "NERWA",
      "RAMPUR",
      "RAMPUR/2 AT SARAHAN",
      "RANSAR (JANGLA)",
      "ROHRU",
      "SHIMLA/4",
      "SUNI",
      "THEOG",
      "TIKKAR",
    ],
    SIRMAUR: [
      "BAKRAS",
      "DADAHU",
      "KAFFOTTA",
      "MAJRA",
      "NAHAN",
      "NARAG",
      "NOHRADHAR",
      "PAONTA SAHIB",
      "RAJGARH",
      "SANGRA",
      "SARAHAN",
      "SATAUN",
      "SHILLAI",
      "SURLA",
    ],
    SOLAN: [
      "ARKI",
      "DHARAMPUR",
      "DHUNDAN",
      "KANDAGHAT",
      "KUTHAR",
      "PATTA NEHLOG",
      "NALAGARH",
      "RAMSHAHAR",
    ],
    UNA: ["AMB", "BANGANA", "GAGRET/1", "GAGRET/2", "HAROLI", "UNA"],
  },
];
