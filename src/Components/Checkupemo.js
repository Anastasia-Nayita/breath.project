<div className="emotionally">
    <h1>Emotionally</h1>
    <div className="checkup-btns">
        <Button
            variant="contained"
            style={{ margin: "10% 0" }}
            color="primary"
            value="great"
            onClick={(e) => handleClick(e)}
        >
            great
        </Button>
        <Button
            style={{ margin: "10% 0" }}
            variant="contained"
            color="primary"
            value="good"
            onClick={(e) => handleClick(e)}
        >
            good
        </Button>
        <Button
            style={{ margin: "10% 0" }}
            variant="contained"
            color="primary"
            value="meh"
            onClick={(e) => handleClick(e)}
        >
            meh
        </Button>
        <Button
            style={{ margin: "10% 0" }}
            variant="contained"
            color="primary"
            value="poor"
            onClick={(e) => handleClick(e)}
        >
            poor
        </Button>
        <Button
            style={{ margin: "10% 0" }}
            variant="contained"
            color="primary"
            value="rough"
            onClick={(e) => handleClick(e)}
        >
            rough
        </Button>
    </div>
    <div>
        <img
            className="phy-img"
            src={image || "../images/Physically_Meh.png"}
        />
    </div>
</div>;
