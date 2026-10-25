import { Chapter, DailyMission, Achievement } from '../types/academy';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 'ch-1',
    number: 1,
    title: 'Candlestick Basics',
    tagline: 'The Genesis of Market Warfare',
    icon: '📜',
    description:
      'Discover how Japanese rice traders pioneered visual price action. Learn why candlesticks reveal battle sentiment far better than plain line charts.',
    estimatedMinutes: 5,
    unlockedLevel: 1,
    xpReward: 30,
    diamondsReward: 5,
    lessons: [
      {
        id: 'ch-1-l1',
        title: 'The Origin of Japanese Candlesticks',
        badge: 'Historical Lore',
        explanation:
          'In 18th-century Japan, a legendary rice merchant named Munehisa Homma realized that price was not merely governed by supply and demand—it was driven by human fear, greed, and military-like emotion. He mapped out candles to visualize trader sentiment in the Dojima Rice Exchange.',
        keyTakeaways: [
          'Candlesticks were born from psychological warfare in rice markets.',
          'Line charts show only closing prices, hiding intraday battles.',
          'Candlesticks capture Open, High, Low, and Close simultaneously.',
        ],
      },
      {
        id: 'ch-1-l2',
        title: 'Bullish vs Bearish Sentiment',
        badge: 'Combat Psychology',
        explanation:
          'Green (Bullish) candles represent the Defense Forces pushing back the threat and closing above the open. Red (Bearish) candles represent the Titan breach—sellers overwhelming buyers and pushing prices lower than where the period began.',
        keyTakeaways: [
          'Green / Bullish: Close > Open (Bulls conquer territory).',
          'Red / Bearish: Close < Open (Bears drive the rout).',
          'Color alone is not enough—size, position, and context determine survival.',
        ],
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Why do seasoned traders favor candlesticks over standard single line charts?',
        options: [
          'Candlesticks expose the full battle range: Open, High, Low, and Close.',
          'Line charts are too colorful and distract from tactical thinking.',
          'Candlesticks guarantee 100% win rate on all upcoming trades.',
          'Line charts only update once per month.',
        ],
        correctIndex: 0,
        explanation:
          'Candlesticks reveal the four key prices (OHLC), exposing intra-period extremes, momentum, and who controlled the session.',
        mentorPraise:
          'Precisely, Cadet! You look deeper than the surface. Line charts hide the slaughter that happened between the bells.',
        mentorScold:
          'Are you blind to the battlefield, Cadet?! A line chart hides the highs and lows where traders get wiped out. Pay attention!',
      },
      {
        id: 'q1-2',
        question: 'When a candlestick closes higher than its opening price, what color is it traditionally and what does it signify?',
        options: [
          'Red, signifying complete seller exhaustion.',
          'Green (or White), signifying buyer dominance (Bullish).',
          'Blue, signifying neutral sideways consolidation.',
          'Black, signifying immediate market halt.',
        ],
        correctIndex: 1,
        explanation:
          'When Close is greater than Open, the candle is green (bullish), indicating buyers took control and lifted prices.',
        mentorPraise:
          'Solid strike! When the bulls push the line forward, the green banner flies high over the wall.',
        mentorScold:
          'Tch! You cannot even tell green from red? Green means the bulls took ground; red means the titan bears smashed through!',
      },
      {
        id: 'q1-3',
        question: 'Who is historically credited with formulating candlestick chart psychology in Japan?',
        options: [
          'Munehisa Homma',
          'Satoshi Nakamoto',
          'Charles Dow',
          'Captain Levi',
        ],
        correctIndex: 0,
        explanation:
          'Munehisa Homma, an 18th-century merchant from Sakata, developed the foundational candlestick rules and market psychology books.',
        mentorPraise:
          'Impressive scholarship, Cadet! Homma understood emotion is the greatest mover of markets.',
        mentorScold:
          'Do not invent fairy tales, Cadet! Munehisa Homma wrote the foundational rules. Do not disrespect the history of market warfare!',
      },
      {
        id: 'q1-4',
        question: 'Which period timeframe can candlesticks be applied to?',
        options: [
          'Only 1-minute scalping charts.',
          'Only monthly macro charts.',
          'Any timeframe: from 1-minute to daily, weekly, and monthly charts.',
          'Only during Japanese exchange trading hours.',
        ],
        correctIndex: 2,
        explanation:
          'Candlesticks are fractal; the same OHLC principles apply whether analyzing a 1-minute tactical chart or a 1-month strategic timeframe.',
        mentorPraise:
          'Outstanding! Candlestick mechanics are universal across every timeframe in the theater of war.',
        mentorScold:
          'Naive! A candle is a unit of time battle. Whether it is 5 minutes or 1 month, the struggle between buyers and sellers remains the same!',
      },
    ],
  },
  {
    id: 'ch-2',
    number: 2,
    title: 'Candle Anatomy',
    tagline: 'Wicks, Bodies & Price Extremes',
    icon: '🗡️',
    description:
      'Dissect the physical anatomy of a candle: the real body, upper wick (shadow), and lower wick. Discover what wick rejection means for trend reversals.',
    estimatedMinutes: 7,
    unlockedLevel: 1,
    xpReward: 40,
    diamondsReward: 5,
    lessons: [
      {
        id: 'ch-2-l1',
        title: 'The Real Body vs The Shadows',
        badge: 'Structural Analysis',
        explanation:
          'The Real Body is the rectangular block between Open and Close. The thin lines protruding from the top and bottom are called Wicks or Shadows. They mark the extreme High and Low reached before price retreated.',
        keyTakeaways: [
          'Upper Wick: High minus the top of the body (Shows rejection of peak highs).',
          'Lower Wick: Bottom of the body minus the Low (Shows rejection of deep lows).',
          'Wide Body: Aggressive directional momentum.',
          'Narrow Body: Stagnation, confusion, or indecision.',
        ],
        interactiveMode: 'anatomy-sandbox',
      },
      {
        id: 'ch-2-l2',
        title: 'Long Wick Rejection: The Shield Wall',
        badge: 'Tactical Defense',
        explanation:
          'A long lower wick means sellers tried to breach deep into support, but buyers formed a shield wall and drove price all the way back up before the close. Conversely, a tall upper wick shows buyers were ambushed and repelled from higher levels.',
        keyTakeaways: [
          'Long wick = aggressive price rejection.',
          'Small wick = smooth trend with little counter-attack.',
          'Zero wick (Marubozu) = total dominance by one side.',
        ],
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'What does a long lower wick (shadow) on a candle reveal about the session battle?',
        options: [
          'Sellers pushed price down, but buyers fiercely counter-attacked and forced price back up.',
          'Bulls surrendered and sellers held all territory.',
          'Trading volume was exactly zero.',
          'The exchange suffered a technical malfunction.',
        ],
        correctIndex: 0,
        explanation:
          'A long lower wick signifies strong rejection of lower price levels—bids rushed in to lift the market back up before the close.',
        mentorPraise:
          'Sharp observation, Cadet! The lower wick is the battlefield where the enemy was driven backwards.',
        mentorScold:
          'Did you even look at the chart?! A long lower shadow means buyers rejected the sell-off with brute force!',
      },
      {
        id: 'q2-2',
        question: 'In a Bullish (Green) candle, where is the Close located relative to the Open?',
        options: [
          'The Close is below the Open.',
          'The Close is at the very tip of the lower wick.',
          'The Close is above the Open, forming the top edge of the real body.',
          'The Close is always equal to the High.',
        ],
        correctIndex: 2,
        explanation:
          'In a bullish candle, the bottom of the body is the Open and the top of the body is the Close.',
        mentorPraise:
          'Correct. You know your blade from the hilt. Open low, close high—that is victory.',
        mentorScold:
          'Cadet! If you cannot tell where a candle opened and closed, you will surrender your coins on your very first trade!',
      },
      {
        id: 'q2-3',
        question: 'What does a candlestick with no wicks at all (a Marubozu) signify?',
        options: [
          'Extreme indecision where no one traded.',
          'One side maintained total relentless dominance from the opening bell to the close.',
          'The market was closed for a national holiday.',
          'Sellers and buyers made peace.',
        ],
        correctIndex: 1,
        explanation:
          'A Marubozu has no upper or lower shadows, indicating one side dictated the price for the entire duration without conceding any ground.',
        mentorPraise:
          'Yes! A Marubozu is a crushing blitzkrieg. When you see it, do not stand in its way!',
        mentorScold:
          'No wicks means NO RETREAT! One side stormed through without giving up an inch. Remember that!',
      },
      {
        id: 'q2-4',
        question: 'What is the price distance between the High and the Low called?',
        options: [
          'The Total Range of the candle.',
          'The Median Moving Average.',
          'The Margin Liquidation Threshold.',
          'The Spread Slippage.',
        ],
        correctIndex: 0,
        explanation:
          'The difference between the absolute highest price and lowest price during the session is known as the Total Range.',
        mentorPraise:
          'Spot on. The total range defines the perimeter of the battlefield for that candle.',
        mentorScold:
          'Focus, Cadet! High minus Low is the total range of the engagement. Stop guessing blindly!',
      },
    ],
  },
  {
    id: 'ch-3',
    number: 3,
    title: 'Candlestick Patterns',
    tagline: 'Recognizing Formations of Power',
    icon: '⚡',
    description:
      'Master the high-probability formations: Hammer, Shooting Star, Doji, Bullish Engulfing, and Bearish Engulfing. Learn to spot the decisive turning points.',
    estimatedMinutes: 8,
    unlockedLevel: 1,
    xpReward: 50,
    diamondsReward: 6,
    lessons: [
      {
        id: 'ch-3-l1',
        title: 'Reversal Titans: Hammer & Shooting Star',
        badge: 'Single Candle Signatures',
        explanation:
          'A Hammer appears at the bottom of a downtrend: small body at the top, long lower wick at least twice the body size. A Shooting Star appears at the top of an uptrend: small body at the bottom, long upper wick rejecting resistance.',
        keyTakeaways: [
          'Hammer: Bullish reversal signal at key support.',
          'Shooting Star: Bearish warning sign at resistance.',
          'Confirmation on the next candle is vital before deploying capital.',
        ],
        interactiveMode: 'pattern-spotter',
      },
      {
        id: 'ch-3-l2',
        title: 'Engulfing Formations: Overwhelming Counter-Attacks',
        badge: 'Multi-Candle Momentum',
        explanation:
          'A Bullish Engulfing pattern occurs when a tall green candle completely swallows the prior red candle body. A Bearish Engulfing pattern occurs when an aggressive red candle engulfs the preceding green candle, signaling that the bears have routed the defense.',
        keyTakeaways: [
          'Engulfing patterns reveal an instant shift in supply and demand.',
          'The larger the engulfing candle compared to the prior, the stronger the conviction.',
          'High trading volume reinforces the legitimacy of the breakout.',
        ],
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Where must a valid Hammer pattern appear to be considered a bullish reversal signal?',
        options: [
          'At the bottom of an established downtrend or near a support floor.',
          'At the very peak of an overbought parabolic uptrend.',
          'Strictly in the middle of a choppy sideways consolidation channel.',
          'Only on weekend crypto futures markets.',
        ],
        correctIndex: 0,
        explanation:
          'A Hammer must appear after a downward move or at support; its long lower wick shows buyers rejecting lower price levels.',
        mentorPraise:
          'Excellent! Context is everything. A hammer in a void is just wood and iron; at support, it is a fortress wall!',
        mentorScold:
          'Incompetent! You cannot call a candle a Hammer reversal if there was no downtrend to reverse! Context dictates survival!',
      },
      {
        id: 'q3-2',
        question: 'What characterizes a Bullish Engulfing pattern?',
        options: [
          'A tiny green candle trapped inside a huge red candle.',
          'A large green candle body completely engulfing the prior red candle body.',
          'Three consecutive red dojis in a row.',
          'A candle with identical upper and lower wicks.',
        ],
        correctIndex: 1,
        explanation:
          'A Bullish Engulfing pattern features a green body that completely overtakes and closes above the prior red body.',
        mentorPraise:
          'Perfection! The green legion consumed the enemy completely. That is decisive power.',
        mentorScold:
          'Do you know what "engulf" means, Cadet?! It means the green body swallows the red body whole! Open your eyes!',
      },
      {
        id: 'q3-3',
        question: 'What does a Shooting Star candle signal when it forms at the peak of an uptrend?',
        options: [
          'Bulls are guaranteed to push prices higher immediately.',
          'Buyers were rejected at higher prices; potential bearish reversal incoming.',
          'The market has entered a permanent freeze.',
          'Volume is about to decrease to zero.',
        ],
        correctIndex: 1,
        explanation:
          'The long upper shadow on a Shooting Star proves buyers pushed up, but aggressive sellers slapped price back down toward the open.',
        mentorPraise:
          'Good read. The bears took high ground and rained arrows down on the overextended buyers.',
        mentorScold:
          'Foolish! If buyers get driven down from the peak and leave a huge upper wick, that is not strength—it is an ambush!',
      },
      {
        id: 'q3-4',
        question: 'What is a Doji candle primarily known for indicating?',
        options: [
          'Absolute market certainty and guaranteed continuation.',
          'Indecision and equilibrium between buyers and sellers.',
          'An immediate emergency market crash.',
          'A signal that no traders are allowed to place orders.',
        ],
        correctIndex: 1,
        explanation:
          'A Doji has virtually equal Open and Close prices, reflecting a temporary standoff or equilibrium between buyers and sellers.',
        mentorPraise:
          'Spot on. When both sides lock blades without moving, that is the calm before the storm.',
        mentorScold:
          'Wrong! A Doji is pure hesitation! Neither side won the round. You must wait for the next candle to confirm direction!',
      },
    ],
  },
  {
    id: 'ch-4',
    number: 4,
    title: 'Market Trends',
    tagline: 'Flow with the Tides of War',
    icon: '🌊',
    description:
      'Learn the three states of the market: Uptrend, Downtrend, and Sideways Range. Spot Higher Highs (HH), Higher Lows (HL), and the death of counter-trend trading.',
    estimatedMinutes: 6,
    unlockedLevel: 2,
    xpReward: 45,
    diamondsReward: 6,
    lessons: [
      {
        id: 'ch-4-l1',
        title: 'Structure: Higher Highs & Higher Lows',
        badge: 'Trend Mechanics',
        explanation:
          'An Uptrend is a series of Higher Highs (HH) and Higher Lows (HL). A Downtrend is defined by Lower Highs (LH) and Lower Lows (LL). Until this sequence is broken, swimming against the current is financial suicide.',
        keyTakeaways: [
          'Uptrend = Bulls consistently advance their forward defensive line.',
          'Downtrend = Bears capture lower territory and repel weak rallies.',
          'Sideways = Equal highs and lows trapped in a consolidation range.',
        ],
        interactiveMode: 'trend-lines',
      },
      {
        id: 'ch-4-l2',
        title: 'Trendlines & Break of Structure (BOS)',
        badge: 'Tactical Trajectories',
        explanation:
          'Connecting swing lows in an uptrend forms an ascending trendline. When price breaks below the prior Higher Low, the market structure breaks (BOS), warning of an imminent regime change.',
        keyTakeaways: [
          'Do not draw trendlines through candle bodies; use consistent swing points.',
          'A valid trendline requires at least 3 distinct touches.',
          'Never fight the dominant higher-timeframe trend.',
        ],
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What is the strict technical definition of a confirmed uptrend?',
        options: [
          'Consecutive Higher Highs (HH) and Higher Lows (HL).',
          'Price touching the moving average once.',
          'Ten green candles occurring within two minutes.',
          'Volume staying at the exact same level all day.',
        ],
        correctIndex: 0,
        explanation:
          'An uptrend requires the market to set both higher peaks (HH) and higher pullbacks (HL).',
        mentorPraise:
          'Discipline rewarded! Higher highs and higher lows—ride the march of the vanguard.',
        mentorScold:
          'Cadet! A random green bar is not an uptrend! You must confirm higher highs AND higher lows or you will get slaughtered!',
      },
      {
        id: 'q4-2',
        question: 'What dangerous mistake do novice traders frequently make during a strong trend?',
        options: [
          'Trying to pick the exact top or bottom by trading against the trend.',
          'Using a stop loss to manage risk.',
          'Checking the higher timeframe chart.',
          'Taking partial profits along the way.',
        ],
        correctIndex: 0,
        explanation:
          'Counter-trend trading ("catching falling knives") wipes out more accounts than almost any other bad habit.',
        mentorPraise:
          'Well said, Cadet. Never stand in front of a charging titan trying to stop it with your bare hands.',
        mentorScold:
          'Idiot! Trying to short a runaway bull market is like throwing yourself into a titan mouth! Trade WITH the momentum!',
      },
      {
        id: 'q4-3',
        question: 'What occurs when price fails to make a Higher High and breaches below the recent Higher Low?',
        options: [
          'A Break of Structure (BOS), signaling potential trend reversal or consolidation.',
          'Immediate guaranteed continuation of the bull run.',
          'The order book clears out all limit orders.',
          'The market switches permanently to an overnight halt.',
        ],
        correctIndex: 0,
        explanation:
          'Failing to make a new high and breaking the previous low invalidates the uptrend structure, signaling trend exhaustion.',
        mentorPraise:
          'A vigilant scout sees the weakness before the walls collapse. Superb analysis!',
        mentorScold:
          'Wake up! The sequence broke! The defense failed to hold the high and lost the low! That is a structural collapse!',
      },
      {
        id: 'q4-4',
        question: 'What percentage of the time do financial markets typically spend in non-trending consolidation ranges?',
        options: [
          'Roughly 70% to 80% of the time.',
          'Only 5% of the time.',
          '100% of the time.',
          'Less than 1% of the time.',
        ],
        correctIndex: 0,
        explanation:
          'Markets consolidate roughly 70-80% of the time, building energy in ranges before launching rapid directional moves.',
        mentorPraise:
          'Patience is a weapon. The true master waits in the trees until the beast enters the clear range.',
        mentorScold:
          'Hasty cadet! Most market time is spent ranging and chopping up impatient fools. Conserve your energy!',
      },
    ],
  },
  {
    id: 'ch-5',
    number: 5,
    title: 'Support and Resistance',
    tagline: 'The Iron Walls of the Order Book',
    icon: '🏰',
    description:
      'Understand how institutional buy and sell orders create impenetrable walls. Master the principle of role reversal: former resistance becomes new support.',
    estimatedMinutes: 7,
    unlockedLevel: 2,
    xpReward: 50,
    diamondsReward: 6,
    lessons: [
      {
        id: 'ch-5-l1',
        title: 'Support Floors & Resistance Ceilings',
        badge: 'Defensive Perimeter',
        explanation:
          'Support is a price floor where buying interest is strong enough to overcome selling pressure. Resistance is a ceiling where supply overtakes demand, halting or reversing an upward rally.',
        keyTakeaways: [
          'Support = Wall Rose defending against downward breaches.',
          'Resistance = The formidable outer perimeter capping upward advancement.',
          'The more times a level is tested, the weaker the resting liquidity becomes.',
        ],
        interactiveMode: 'support-resistance',
      },
      {
        id: 'ch-5-l2',
        title: 'The Principle of Role Reversal',
        badge: 'Tactical Realignment',
        explanation:
          'When Resistance is decisively shattered with high volume, it flips and becomes the new Support zone on subsequent retests. Traders who missed the breakout wait at this level to enter.',
        keyTakeaways: [
          'Old Resistance = New Support (Breakout & Retest).',
          'Old Support = New Resistance (Breakdown & Retest).',
          'Wait for the retest confirmation before committing large positions.',
        ],
      },
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'What happens to a strong resistance level after price violently shatters it with high volume?',
        options: [
          'It often flips into a new support zone on subsequent pullbacks.',
          'It disappears forever and price can never touch it again.',
          'It instantly triggers an automatic short squeeze shutdown.',
          'It forces all market makers to resign.',
        ],
        correctIndex: 0,
        explanation:
          'Role reversal is a cornerstone of price action: once broken, prior resistance becomes support as trapped sellers cover and breakout traders buy the dip.',
        mentorPraise:
          'Flawless! When you capture the enemy fortress, you turn their ramparts into your new forward base.',
        mentorScold:
          'Think tactically, Cadet! When resistance falls, buyers defend that very same line on the retreat! Role reversal!',
      },
      {
        id: 'q5-2',
        question: 'What is a "fakeout" (bull or bear trap) around a support or resistance line?',
        options: [
          'Price momentarily pokes past a level to trigger stops, then immediately snaps back into the range.',
          'A trade that is executed without paying exchange fees.',
          'When the chart displays fictitious numbers.',
          'A candle that has no wicks.',
        ],
        correctIndex: 0,
        explanation:
          'A fakeout hunts liquidity beyond visible levels to trap emotional breakout traders before reversing in the opposite direction.',
        mentorPraise:
          'Sharp eye! The predators bait the cadets into the open field, then spring the trap. Never rush in without confirmation.',
        mentorScold:
          'You fell straight into the pit! Whales love to poke through the wall just to eat your stop-loss and reverse!',
      },
      {
        id: 'q5-3',
        question: 'Why should support and resistance be drawn as "zones" rather than razor-thin single pixel lines?',
        options: [
          'Because market orders, bids, and asks are distributed across a price band, not a single exact cent.',
          'Because drawing zones takes up more screen space.',
          'Because computerized algorithms cannot read zones.',
          'Because brokers ban single-line charts.',
        ],
        correctIndex: 0,
        explanation:
          'Markets are fluid auctions. Orders cluster in price regions, making zones much more realistic than an exact rigid price tick.',
        mentorPraise:
          'Accurate! The battlefield is uneven terrain; you defend a zone, not a single pebble on the ground.',
        mentorScold:
          'Rigid thinking will get you slain! Orders are placed in ranges. If you rely on one exact penny, you will miss every entry!',
      },
      {
        id: 'q5-4',
        question: 'What typically happens to a support level the more frequently it is hammered by sellers without bouncing strongly?',
        options: [
          'The support level weakens as resting buy orders are absorbed and depleted.',
          'The support level becomes infinitely stronger each touch.',
          'The price is guaranteed to jump 50% immediately.',
          'The candle body becomes permanently green.',
        ],
        correctIndex: 0,
        explanation:
          'Each touch absorbs and consumes standing buy limit orders; without fresh demand, the floor eventually yields.',
        mentorPraise:
          'A seasoned commander understands fatigue. Even Wall Maria cracks under repeated blows.',
        mentorScold:
          'Childish assumption! Repeated strikes wear down the defenders. Each hit consumes the buy orders until the wall crumbles!',
      },
    ],
  },
  {
    id: 'ch-6',
    number: 6,
    title: 'Volume and Indicators',
    tagline: 'Sonar in the Fog of War',
    icon: '📊',
    description:
      'Learn how trading volume validates candlestick honesty. Explore the Relative Strength Index (RSI), Moving Averages (SMA/EMA), and the danger of indicator clutter.',
    estimatedMinutes: 8,
    unlockedLevel: 3,
    xpReward: 55,
    diamondsReward: 7,
    lessons: [
      {
        id: 'ch-6-l1',
        title: 'Volume: The Fuel of the Vanguard',
        badge: 'Liquidity Intelligence',
        explanation:
          'Price is what you see; volume is how much ammunition was fired. A breakout on massive volume indicates institutional conviction. A breakout on feeble volume is often a deceptive trap waiting to collapse.',
        keyTakeaways: [
          'High Volume + Breakout = Strong probability of continuation.',
          'Low Volume + Breakout = High risk of false breakdown/trap.',
          'Volume precedes price movement in heavy accumulation phases.',
        ],
        interactiveMode: 'volume-rsi',
      },
      {
        id: 'ch-6-l2',
        title: 'RSI & Moving Average Tactics',
        badge: 'Oscillators & Trend Filters',
        explanation:
          'The Relative Strength Index (RSI) measures momentum between 0 and 100. Over 70 suggests overextended exhaustion (overbought); under 30 suggests extreme panic selling (oversold). Moving averages (e.g. 50 SMA and 200 SMA) act as dynamic trend filters.',
        keyTakeaways: [
          'Never use indicators in isolation—candlestick price action reigns supreme.',
          'Bullish Divergence: Price makes lower low, but RSI makes higher low.',
          'Golden Cross: Fast MA crosses above Slow MA (Long-term bullish signal).',
        ],
      },
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'If a massive green breakout candle occurs on very low, anaemic volume, what should a disciplined trader suspect?',
        options: [
          'A potential low-liquidity trap / false breakout lacking institutional sponsorship.',
          'An infallible guarantee that price will double by tomorrow.',
          'That market makers have abandoned the asset permanently.',
          'That the exchange has disabled seller orders.',
        ],
        correctIndex: 0,
        explanation:
          'A breakout without volume is like a charge with no soldiers behind you. It easily stalls and falls back inside the gates.',
        mentorPraise:
          'Good vigilance! If there are no troops behind the banner, the vanguard will be surrounded and crushed.',
        mentorScold:
          'Tch! You fell for the scout dummy! A breakout with no volume has zero fuel. Do not gamble on empty momentum!',
      },
      {
        id: 'q6-2',
        question: 'What does an RSI reading above 70 typically indicate?',
        options: [
          'The asset is entering overbought territory and momentum may be overextended.',
          'The asset is guaranteed to drop to zero within five minutes.',
          'The asset has zero volatility.',
          'Trading has been suspended by regulators.',
        ],
        correctIndex: 0,
        explanation:
          'An RSI above 70 indicates strong recent upward momentum, meaning buyers may be stretched thin and vulnerable to pullbacks.',
        mentorPraise:
          'Correct. When the vanguard runs too fast without water, fatigue sets in. Expect a regrouping phase.',
        mentorScold:
          'Careless! Over 70 means overbought exhaustion is brewing! Do not initiate reckless long entries at extreme overextensions!',
      },
      {
        id: 'q6-3',
        question: 'What is "Bullish Divergence" between price and the RSI indicator?',
        options: [
          'Price creates a Lower Low, but RSI creates a Higher Low, signaling waning downside momentum.',
          'Price and RSI both rise simultaneously to infinity.',
          'Price drops 90% while RSI stays pinned at 100.',
          'When RSI turns purple on the display.',
        ],
        correctIndex: 0,
        explanation:
          'Bullish divergence reveals that although price pushed slightly lower, the selling force was significantly weaker than the previous drop.',
        mentorPraise:
          'Masterful detection! The enemy made one last desperate push, but their strength was visibly spent.',
        mentorScold:
          'Blind cadet! Divergence is when the indicator disagrees with price! Lower low in price + higher low in RSI = bear exhaustion!',
      },
      {
        id: 'q6-4',
        question: 'Why do master traders avoid cluttering their screens with ten different indicators?',
        options: [
          'It causes "Analysis Paralysis" and conflicting signals that obscure clean price action.',
          'Indicators cost $1,000 per month each to display on screen.',
          'Charts cannot render more than two lines at once.',
          'Indicators are strictly illegal in professional trading firms.',
        ],
        correctIndex: 0,
        explanation:
          'Too many lagging indicators conflict with each other and obscure the raw price action, leading to hesitation and missed opportunities.',
        mentorPraise:
          'Clarity of vision is supreme. A cluttered mind and a cluttered chart will both betray you in combat.',
        mentorScold:
          'Ridiculous! If your screen looks like modern art with twelve rainbow lines, you will freeze when the decisive moment strikes!',
      },
    ],
  },
  {
    id: 'ch-7',
    number: 7,
    title: 'Risk Management',
    tagline: 'The Shield That Keeps You Alive',
    icon: '🛡️',
    description:
      'The sacred creed of the trader. Master the 1-2% rule, Stop-Loss placement, position sizing mathematics, and how asymmetric Risk-to-Reward guarantees longevity.',
    estimatedMinutes: 9,
    unlockedLevel: 3,
    xpReward: 60,
    diamondsReward: 8,
    lessons: [
      {
        id: 'ch-7-l1',
        title: 'The 1% Rule: Survival Precedes Victory',
        badge: 'Absolute Doctrine',
        explanation:
          'No single trade should ever risk more than 1% to 2% of your total account equity. Even with a devastating streak of 10 consecutive losses, a trader risking 1% retains 90%+ of their ammunition to fight another day.',
        keyTakeaways: [
          'Risking 10% per trade leads to ruin in a normal drawdown.',
          'Your stop-loss is not an admission of defeat; it is tactical armor.',
          'Never enter an order without a predetermined exit price.',
        ],
        interactiveMode: 'risk-calc',
      },
      {
        id: 'ch-7-l2',
        title: 'Asymmetric Risk-to-Reward (R:R)',
        badge: 'Mathematical Edge',
        explanation:
          'If you risk $100 to make $200 (1:2 R:R), you only need a 40% win rate to be highly profitable over 100 battles! At 1:3 R:R, you can be wrong 70% of the time and still come out ahead.',
        keyTakeaways: [
          'Win rate is secondary to Risk-to-Reward ratio.',
          'Cut losses quickly when the premise is invalidated.',
          'Let winning trends run to their strategic objectives.',
        ],
      },
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'Under standard professional risk rules, what maximum percentage of total capital should be risked on a single trade?',
        options: [
          '1% to 2% of total account capital.',
          '50% to maximize quick doubling.',
          '100% on high-conviction "sure thing" setups.',
          'Risk does not matter as long as leverage is high.',
        ],
        correctIndex: 0,
        explanation:
          'Risking 1-2% preserves capital across adverse statistical drawdowns, guaranteeing the trader cannot be wiped out by bad luck.',
        mentorPraise:
          'Listen to me, Cadet. Your capital is your heartbeat. Guard it with the 1% rule and you will never be destroyed.',
        mentorScold:
          'Death wish! Anyone who risks 20% or 50% on one trade is a reckless gambler destined for total liquidation!',
      },
      {
        id: 'q7-2',
        question: 'If you take 10 trades with a 1:3 Risk-to-Reward ratio (Risk $100 to make $300), and win only 4 out of 10, what is your net profit?',
        options: [
          '+$600 net profit (Won $1,200, lost $600).',
          '-$200 net loss.',
          'Exactly broke even ($0).',
          '-$1,000 loss.',
        ],
        correctIndex: 0,
        explanation:
          '4 wins * $300 = $1,200 profit. 6 losses * $100 = $600 loss. Net gain = +$600, despite losing 60% of trades!',
        mentorPraise:
          'Behold the power of mathematics! You lost more than half your skirmishes and still walked away victorious.',
        mentorScold:
          'Do the arithmetic, Cadet! 4 wins * $300 is $1,200. Minus 6 losses * $100 is +$600! High R:R forgives low win rates!',
      },
      {
        id: 'q7-3',
        question: 'Where should your Stop-Loss order be placed on a long position?',
        options: [
          'At a technical invalidation level (e.g. below key support or swing low) where the trade thesis is proven wrong.',
          'At the exact price you bought so you can never lose a penny.',
          'Nowhere; true warriors hold through a 90% drawdown.',
          'Randomly wherever your fingers click first.',
        ],
        correctIndex: 0,
        explanation:
          'A stop-loss belongs where the setup is technically invalidated—if that price is hit, the reason for being in the trade is dead.',
        mentorPraise:
          'Wise tactics. If the wall is breached, retreat and regroup. Never cling to dead ground.',
        mentorScold:
          'Holding without a stop-loss is cowardice masquerading as bravery! Place your stop where the thesis is dead!',
      },
      {
        id: 'q7-4',
        question: 'What is the danger of "Revenge Trading" after suffering an unexpected loss?',
        options: [
          'Emotional distress leads to oversized positions, ignored stops, and catastrophic account wipeout.',
          'The broker gives you a discount on transaction fees.',
          'Your chart automatically speeds up.',
          'There is no danger; revenge trading always restores lost funds.',
        ],
        correctIndex: 0,
        explanation:
          'Revenge trading replaces cold discipline with emotional rage, causing traders to over-leverage and dig an inescapable hole.',
        mentorPraise:
          'Steel nerves, Cadet. When you take a hit, breathe, reset, and wait for the market to give a clear setup.',
        mentorScold:
          'Disgraceful! If you let anger dictate your blade, the titans will chew you up in seconds! Master your emotions!',
      },
    ],
  },
  {
    id: 'ch-8',
    number: 8,
    title: 'Final Exam: Titan Wall Trial',
    tagline: 'The Ultimate Cadet Graduation Gauntlet',
    icon: '👑',
    description:
      'Prove your mastery before Commander Mikoto. Ten rigorous questions spanning candlestick anatomy, patterns, structure, volume, and battle-tested risk math.',
    estimatedMinutes: 12,
    unlockedLevel: 4,
    xpReward: 100,
    diamondsReward: 15,
    lessons: [
      {
        id: 'ch-8-l1',
        title: 'The Vanguard Oath',
        badge: 'Graduation Protocol',
        explanation:
          'You have studied the candlestick anatomy, identified the reversal titans, plotted the iron walls of support, and sworn allegiance to the 1% risk discipline. Now, face the comprehensive gauntlet and earn the coveted Titan Slayer Vanguard pin.',
        keyTakeaways: [
          'Consolidate all seven disciplines into split-second execution.',
          'No emotional impulses: analyze the candles objectively.',
          'Every answered question forges your career as a formidable market trader.',
        ],
      },
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'What does a candle with an extremely long upper wick, small body at the bottom, and tiny lower wick at resistance represent?',
        options: [
          'A Shooting Star indicating severe rejection of higher prices.',
          'A Hammer indicating imminent massive bullish breakout.',
          'A neutral spinning top with equal probability.',
          'A Marubozu indicating total buyer dominance.',
        ],
        correctIndex: 0,
        explanation:
          'A long upper wick with small body at resistance is a Shooting Star, demonstrating that buyers were violently turned back.',
        mentorPraise:
          'Direct strike to the nape! You spotted the exhaustion immediately.',
        mentorScold:
          'Careless! A long upper shadow is a Shooting Star! The buyers were slaughtered at the heights!',
      },
      {
        id: 'q8-2',
        question: 'In position sizing, if your capital is $20,000 and you risk 1.5%, what is your maximum acceptable dollar loss?',
        options: [
          '$300 ($20,000 * 0.015).',
          '$1,500.',
          '$50.',
          '$3,000.',
        ],
        correctIndex: 0,
        explanation:
          '$20,000 * 0.015 = $300 maximum risk.',
        mentorPraise:
          'Accurate accounting. Every dollar of ammunition accounted for.',
        mentorScold:
          'Calculate properly! 1.5% of $20,000 is $300! Do not miscalculate your shield limits!',
      },
      {
        id: 'q8-3',
        question: 'When price breaks cleanly through a major horizontal resistance ceiling with towering volume, what is the best tactical entry?',
        options: [
          'Wait for a measured pullback and retest of the old resistance as new support, accompanied by bullish price action.',
          'Immediately leverage 100x at the exact peak of the breakout candle.',
          'Short the stock because high volume always causes an immediate crash.',
          'Close the browser and wait 6 months.',
        ],
        correctIndex: 0,
        explanation:
          'Buying the retest of broken resistance offers the highest reward-to-risk ratio and a clear invalidation level.',
        mentorPraise:
          'Patience and poise! You let the dust settle and strike at the fortress gates.',
        mentorScold:
          'Chasing the green peak will get you slaughtered! Wait for the retest and let former resistance prove itself as support!',
      },
      {
        id: 'q8-4',
        question: 'What is the primary message of a "Dragonfly Doji" appearing at the conclusion of a prolonged sell-off?',
        options: [
          'Sellers drove price to severe lows, but buyers absorbed all supply and forced price back up to open.',
          'Bears have won the war permanently.',
          'No orders were matched in the market.',
          'The trend is guaranteed to collapse another 50%.',
        ],
        correctIndex: 0,
        explanation:
          'The long lower shadow and open/close at the highs of the Dragonfly Doji show heroic buyer defense and potential bottoming.',
        mentorPraise:
          'Superb! The line held. The defenders refused to concede an inch by sundown.',
        mentorScold:
          'Cadet! A dragonfly has a long lower tail! That means buyers rejected the abyss!',
      },
      {
        id: 'q8-5',
        question: 'Why is simulated trading and structured chart pattern training essential before risking real capital?',
        options: [
          'It develops pattern recognition, emotional muscle memory, and risk habits without risking ruin.',
          'It guarantees you will never experience a losing trade in your lifetime.',
          'It allows you to manipulate real-world market prices.',
          'It is legally required by every country.',
        ],
        correctIndex: 0,
        explanation:
          'Simulated drills build disciplined habits, pattern familiarity, and risk management reflexes before real funds are on the line.',
        mentorPraise:
          'Well spoken, Cadet. The blood spilled in mock training saves lives on the real battlefield.',
        mentorScold:
          'Arrogance! A rookie who rushes to the front line without drilling is cannon fodder! Master the simulator first!',
      },
    ],
  },
];

export const INITIAL_DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'm-1',
    title: 'Drill Candlestick Anatomy',
    description: 'Experiment with the interactive anatomy sandbox and inspect candle wicks.',
    targetCount: 1,
    currentCount: 0,
    xpReward: 20,
    diamondsReward: 2,
    completed: false,
    claimed: false,
    actionKey: 'inspect_anatomy',
  },
  {
    id: 'm-2',
    title: 'Chart Pattern Scouting',
    description: 'Switch and inspect 3 distinct patterns in the Candlestick Dojo.',
    targetCount: 3,
    currentCount: 0,
    xpReward: 25,
    diamondsReward: 3,
    completed: false,
    claimed: false,
    actionKey: 'view_patterns',
  },
  {
    id: 'm-3',
    title: 'Commander Quiz Trial',
    description: 'Complete any chapter quiz with a passing score.',
    targetCount: 1,
    currentCount: 0,
    xpReward: 30,
    diamondsReward: 4,
    completed: false,
    claimed: false,
    actionKey: 'complete_quiz',
  },
  {
    id: 'm-4',
    title: 'Risk Fortress Calculations',
    description: 'Calculate position size on the Tactical Risk Management station.',
    targetCount: 1,
    currentCount: 0,
    xpReward: 20,
    diamondsReward: 2,
    completed: false,
    claimed: false,
    actionKey: 'calculate_risk',
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Blood',
    badge: '🩸',
    description: 'Complete your first quiz with Commander Mikoto.',
    requirement: 'Pass Chapter 1 Quiz',
    unlocked: false,
  },
  {
    id: 'ach-2',
    title: 'Iron Wall Defender',
    badge: '🛡️',
    description: 'Master the Support and Resistance chapter.',
    requirement: 'Complete Chapter 5',
    unlocked: false,
  },
  {
    id: 'ach-3',
    title: 'Risk Tactician',
    badge: '⚖️',
    description: 'Master the 1-2% risk discipline and formula.',
    requirement: 'Pass Chapter 7 Quiz with 100%',
    unlocked: false,
  },
  {
    id: 'ach-4',
    title: 'Titan Slayer Vanguard',
    badge: '👑',
    description: 'Graduate from the Titan Wall Academy Final Gauntlet.',
    requirement: 'Pass the Chapter 8 Final Exam',
    unlocked: false,
  },
  {
    id: 'ach-5',
    title: 'Cadet Disciplined Streak',
    badge: '🔥',
    description: 'Maintain an active training streak.',
    requirement: 'Reach 3 days active streak',
    unlocked: false,
  },
];

// Rich Simulated Market Feed data (Wall Maria / District Index Synthetic Data)
export const SAMPLE_CANDLE_FEED = [
  { id: 'c-1', time: '09:30', open: 120.5, high: 124.0, low: 119.2, close: 123.8, volume: 14200, label: 'Opening Surge' },
  { id: 'c-2', time: '09:45', open: 123.8, high: 126.5, low: 122.9, close: 125.9, volume: 18500, label: 'Bullish Momentum' },
  { id: 'c-3', time: '10:00', open: 125.9, high: 131.0, low: 125.4, close: 126.2, volume: 24300, pattern: 'Shooting Star', annotation: 'Bears reject 131.0 resistance' },
  { id: 'c-4', time: '10:15', open: 126.2, high: 126.8, low: 121.0, close: 121.5, volume: 29800, pattern: 'Bearish Engulfing', annotation: 'Titan Breach through 123.8' },
  { id: 'c-5', time: '10:30', open: 121.5, high: 122.3, low: 117.4, close: 118.0, volume: 22100, label: 'Panic Sell-off' },
  { id: 'c-6', time: '10:45', open: 118.0, high: 118.8, low: 111.5, close: 117.8, volume: 38400, pattern: 'Hammer', annotation: 'Massive wick rejection at 111.5 Support Wall' },
  { id: 'c-7', time: '11:00', open: 117.8, high: 122.4, low: 117.0, close: 122.0, volume: 31200, pattern: 'Bullish Reversal', annotation: 'Confirmation candle above Hammer' },
  { id: 'c-8', time: '11:15', open: 122.0, high: 123.5, low: 121.0, close: 122.8, volume: 15400, label: 'Consolidation' },
  { id: 'c-9', time: '11:30', open: 122.8, high: 123.0, low: 122.4, close: 122.7, volume: 8900, pattern: 'Doji', annotation: 'Standoff at 122.7' },
  { id: 'c-10', time: '11:45', open: 122.7, high: 127.2, low: 122.5, close: 126.9, volume: 27600, label: 'Breakout Wave' },
  { id: 'c-11', time: '12:00', open: 126.9, high: 130.4, low: 126.0, close: 129.8, volume: 25100, label: 'Defenders Advance' },
  { id: 'c-12', time: '12:15', open: 129.8, high: 130.8, low: 128.5, close: 128.9, volume: 14700, pattern: 'Spinning Top', annotation: 'Upper wall test' },
  { id: 'c-13', time: '12:30', open: 128.9, high: 134.0, low: 128.6, close: 133.5, volume: 41000, pattern: 'Bullish Marubozu', annotation: 'Wall Maria Breach in Bulls Favor!' },
  { id: 'c-14', time: '12:45', open: 133.5, high: 135.2, low: 132.8, close: 134.1, volume: 19500, label: 'High Altitude Base' },
  { id: 'c-15', time: '13:00', open: 134.1, high: 134.8, low: 133.0, close: 133.6, volume: 12400, label: 'Midday Volume Pause' },
];
