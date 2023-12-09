import { useEffect, useState } from "react";
import CardProps from "../../Models/CardProps";

const Main = () => {
  const [rank, setRank] = useState(12);
  const [durability, setDurability] = useState(45);
  const [platinum, setPlatinum] = useState(14000);
  const [flask, setFlask] = useState(50000);
  const [essence, setEssence] = useState(32000);
  const [reol, setReol] = useState(240000);
  const [dvigg, setDvigg] = useState(90000);
  const [upgradeTarget, setUpgradeTarget] = useState(7);
  const [iterations, setIterations] = useState(10);
  const [displayStats, setDisplayStats] = useState(false);
  const [highestPrice, setHighestPrice] = useState(Number.MIN_SAFE_INTEGER);
  const [averagePrice, setAveragePrice] = useState(0);
  const [lowestPrice, setLowestPrice] = useState(Number.MAX_SAFE_INTEGER);
  const [cardProps, setCardProps] = useState<CardProps[]>();

  const ranksRoman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];



  useEffect(() => {
    const initialCardProps: CardProps[] = Array.from({ length: upgradeTarget }, (_, index) => ({
      essence: index >= 2,
      reol: index >= 7,
      dvigg: index >= 7,
    }));
    setCardProps(initialCardProps);
  }, [upgradeTarget]);


  useEffect(() => {
    console.log(cardProps);
  }, [cardProps]);


  const handleChangeRankButton = (event: any) => {
    setRank(event.target.value)
  }

  const handleCheckboxChange = (cardIndex: number, field: keyof CardProps) => {
    setCardProps((prevCardProps) => {
      if (!prevCardProps) {
        return [];
      }

      const updatedCardProps = [...prevCardProps];
      updatedCardProps[cardIndex] = {
        ...updatedCardProps[cardIndex],
        [field]: !updatedCardProps[cardIndex][field],
      };
      return updatedCardProps;
    });
  };

  const simulateUpgrade = () => {
    if (cardProps) {
      let chances = [95, 85, 75, 65, 50, 40, 30, 20, 10];
      let upgradePrices = [1000, 2000, 3000, 10000, 15000, 25000, 35000, 50000, 65000, 100000, 200000, 300000]
      let inhibitorPrices = [3, 4, 4, 5, 6, 6, 7, 8, 8, 10, 12, 12];
      let sum = 0;
      let currentSum = 0;
      let currentUpgrade = 0;
      let currentSpin = 0;
      let min = Number.MAX_SAFE_INTEGER;
      let max = Number.MIN_SAFE_INTEGER;
      let zeroing = 0;

      for (let i = 0; i < iterations; i++) {
        let spins = 0
        while (currentUpgrade < upgradeTarget) {
          currentSum += upgradePrices[rank - 1] + (cardProps[currentUpgrade].essence ? essence : 0) +
            (cardProps[currentUpgrade].reol ? reol : 0) + (cardProps[currentUpgrade].dvigg ? dvigg : 0) + inhibitorPrices[rank - 1] * platinum +
            flask;
          currentSpin = Math.floor(Math.random() * 100) + 1;
          if (currentSpin <= 2 + (cardProps[currentUpgrade].dvigg ? 2 : 1)) {
            currentUpgrade += 2;
          } else {
            if (currentUpgrade === 0) {
              if (currentSpin <= chances[0] + (cardProps[currentUpgrade].essence ? 2 : 0)) {
                currentUpgrade++;
              }
            } else if (currentUpgrade > 8) {
              if (currentSpin > chances[8] + (cardProps[currentUpgrade].essence ? 10 : 0)) {
                zeroing = Math.floor(Math.random() * 100) + 1;
                if (zeroing > durability + (cardProps[currentUpgrade].reol ? 20 : 0)) {
                  currentUpgrade = 0;
                }
              } else {
                currentUpgrade++;
              }
            } else {
              if (currentSpin > chances[currentUpgrade] + (cardProps[currentUpgrade].essence ? 10 : 0)) {
                zeroing = Math.floor(Math.random() * 100) + 1;
                if (zeroing > durability + (cardProps[currentUpgrade].reol ? 20 : 0)) {
                  currentUpgrade = 0;
                }
              } else {
                currentUpgrade++;
              }
            }
          }
          spins++;

        }
        console.log("Current sum: " + currentSum);
        console.log('Spins: ' + spins);
        sum += currentSum;
        if (currentSum < min) {
          min = currentSum;
        }
        if (currentSum > max) {
          max = currentSum;
        }
        currentSum = 0;
        currentUpgrade = 0;
      }
      setAveragePrice(Math.round(sum / iterations));
      setHighestPrice(max);
      setLowestPrice(min);
      setDisplayStats(true);
    }
  }

  return (
    // --------------------------------------------- LEFT COLUMN ------------------------------------------------- 
    <div className="row d-flex">
      <div className="col-md-6 left-col" style={{ background: 'black', border: 'solid 1px black', boxShadow: '0 0 3px 1px black', maxHeight: '830px' }}>
        <div className="d-flex justify-content-center align-items-center left-div my-3">
          <h2
            className="text-center users-input-headings my-3 main-theme-text"
          >
            Rank
          </h2>
          <div
            className="dropdown d-flex justify-content-center align-items-center"
            style={{ width: '30%', margin: '0 auto' }}
          >
            <button
              className="btn btn-dark dropdown-toggle d-flex justify-content-center align-items-center user-input"
              aria-expanded="false"
              data-bs-toggle="dropdown"
              type="button"
              style={{
                width: '100%'
              }}
            >
              {ranksRoman[rank - 1]}
            </button>
            <div className="dropdown-menu grid " style={{ background: "#212529", boxShadow: '0 0 9px 3px #212529' }}>
              <button type="button" value={1} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                I
              </button>
              <button type="button" value={2} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                II
              </button>
              <button type="button" value={3} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                III
              </button>
              <button type="button" value={4} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                IV
              </button>
              <button type="button" value={5} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                V
              </button>
              <button type="button" value={6} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                VI
              </button>
              <button type="button" value={7} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                VII
              </button>
              <button type="button" value={8} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                VIII
              </button>
              <button type="button" value={9} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                IX
              </button>
              <button type="button" value={10} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                X
              </button>
              <button type="button" value={11} className="rank-user-choice m-2 main-theme-text" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                XI
              </button>
              <button type="button" value={12} className="rank-user-choice main-theme-text m-2" onClick={(e) => handleChangeRankButton(e)} style={{ border: 'solid 2px #868e96', boxShadow: '0 0 3px 1px #868e96' }}>
                XII
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center left-div my-3">
          <h2
            className="text-center users-input-headings my-3 main-theme-text"
          >
            Durability
          </h2>
          <input
            className="form-control-lg user-input"
            type="number"
            step="1"
            placeholder="%"
            value={durability === 0 ? '' : durability}
            min="0"
            max="100"
            onChange={e => setDurability(Number(e.target.value))}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center left-div my-3">
          <h2
            className="text-center users-input-headings my-3 main-theme-text"
          >
            Platinum
          </h2>
          <input
            className="form-control-lg user-input"
            type="number"
            step="500"
            placeholder="price"
            min="0"
            value={platinum === 0 ? '' : platinum}
            onChange={e => setPlatinum(Number(e.target.value))}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center left-div my-3">
          <h2
            className="text-center users-input-headings my-3 main-theme-text"
          >
            Flask
          </h2>
          <input
            className="form-control-lg user-input"
            type="number"
            step="500"
            placeholder="price"
            min="0"
            value={flask === 0 ? '' : flask}
            onChange={e => setFlask(Number(e.target.value))}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center left-div my-3">
          <h2
            className="text-center users-input-headings my-3 main-theme-text"
          >
            Essence
          </h2>
          <input
            className="form-control-lg user-input"
            type="number"
            step="500"
            placeholder="price"
            min="0"
            value={essence === 0 ? '' : essence}
            onChange={e => setEssence(Number(e.target.value))}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center left-div my-3">
          <h2
            className="text-center users-input-headings my-3 main-theme-text"
          >
            Reol
          </h2>
          <input
            className="form-control-lg user-input"
            type="number"
            step="500"
            placeholder="price"
            min="0"
            value={reol === 0 ? '' : reol}
            onChange={e => setReol(Number(e.target.value))}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center left-div my-3">
          <h2
            className="text-center users-input-headings my-3 main-theme-text"
          >
            Dvigg
          </h2>
          <input
            className="form-control-lg user-input"
            type="number"
            step="500"
            placeholder="price"
            min="0"
            value={dvigg === 0 ? '' : dvigg}
            onChange={e => setDvigg(Number(e.target.value))}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center left-div my-3">
          <h2
            className="text-center users-input-headings my-3 main-theme-text"
          >
            Upgrade target
          </h2>
          <input
            className="form-control-lg user-input"
            type="number"
            step="1"
            value={upgradeTarget === 0 ? '' : upgradeTarget}
            min="1"
            onChange={e => setUpgradeTarget(Number(e.target.value))}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center left-div my-3">
          <h2
            className="text-center users-input-headings my-3 main-theme-text"
          >
            Iterations
          </h2>
          <input
            className="form-control-lg user-input"
            type="number"
            step="1"
            value={iterations}
            min="1"
            onChange={e => setIterations(Number(e.target.value))}
          />
        </div>
      </div>


      {// --------------------------------------------- MIDDLE COLUMN -------------------------------------------------
      }


      <div className="col d-flex flex-column justify-content-center align-items-center mid-col mx-4 my-5" style={{ maxHeight: '300px' }}>
        <div className="p-2 my-5" style={{ background: 'black', boxShadow: '0 0 3px 1px #868e96' }}>
          <button className="btn main-theme-text" type="button" style={{ borderRadius: '0px' }} onClick={simulateUpgrade}>
            Simulate
          </button>
        </div>
        {displayStats && (
          <div className="m-5">
            <div className="main-theme-text mb-3">
              <h4>
                Average cost: {new Intl.NumberFormat().format(averagePrice)}
              </h4>
            </div>
            <div className="main-theme-text mb-3">
              <h4>
                Lowest cost: {new Intl.NumberFormat().format(lowestPrice)}

              </h4>
            </div>
            <div className="main-theme-text">
              <h4>
                Highest cost: {new Intl.NumberFormat().format(highestPrice)}
              </h4>
            </div>
          </div>

        )}
      </div>




      {// --------------------------------------------- RIGHT COLUMN -------------------------------------------------
      }


      <div className="col-md-6 d-flex flex-wrap right-col justify-content-center" style={{ alignContent: 'start' }}>
        {cardProps && cardProps.map((card, index) => (
          <div key={index} className="text-center my-2 mx-2 upgrade-card">
            <h1 className="main-theme-text">
              +{index}
            </h1>
            <div className="d-flex justify-content-center align-items-center">
              <span className="main-theme-text">Essence</span>
              <input
                className="mx-3 "
                type="checkbox"
                checked={card.essence}
                onChange={() => handleCheckboxChange(index, 'essence')}

              />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <span className="main-theme-text">Reol</span>
              <input
                className="mx-3 dark-checkbox"
                type="checkbox"
                checked={card.reol}
                onChange={() => handleCheckboxChange(index, 'reol')}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <span className="main-theme-text">Dvigg</span>
              <input
                className="mx-3"
                type="checkbox"
                checked={card.dvigg}
                onChange={() => handleCheckboxChange(index, 'dvigg')}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Main;