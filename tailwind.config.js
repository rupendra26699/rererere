module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Barlow", "sans-serif"],
      },
      backgroundImage: {
        homePage: ' url("./Assets/images/background.png")',
        passwordEye: 'url("./Assets/images/eye-slash-solid.svg")',
        searchButton: 'url("./Assets/images/search.svg")',
        calender: 'url("./Assets/images/calendar.png") ',
        selectBox: 'url("./Assets/images/dropdown.png")',
      },

      backgroundSize: {
        1: "10px",
        2: "20px",
      },
      width: {
        35: "35% !important"
      },
      colors: {
        primary: "#ef7e26",
        errorRed: "#e61e25",
        inputFieldBorder: "#cecece",
        inputFieldText: "#191919",
        inputComponentBorderColor: "#cecece",
        inputFieldErrorBorderColor: "#e61e25",
        inputDisabledBackgroundColor: "#f5f5f5",
        inputFieldErrorMessageColor: "#e61e25",
        linkColor: "#2572f0",
        iconBackColor: "#cecece",
        onHoverBackground: "rgba(241, 239, 239, 0.822)",
        textlight: "#767676",
        sidenavBackground: "#f1f5f9",
        blackButton: "#191919",
        tableheadColor: "#f1f5f9 ",
        tableshadowColor: "#dedede",
        fileuploadButton: "#2572f0",
        modalBackground: " rgba(0, 0, 0, 0.6)",
        containerBgColor: "rgb(243, 243, 243)",
        downloadButton: "rgb(16, 160, 16)",
        cardTop: "#f2f2f2",
        selectBackground: "#dddddd",
        selectOptionBackground: "#fff7ed",
        selectOptionSelectedBackground: "#fdba74"
      },
    },
  },
  plugins: [],
};
