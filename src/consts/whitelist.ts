import { TokenType, LpofLpType, LpStakingType } from 'types/network'

import USTLogo from 'images/whitelist/UST.png'
import MIAWLogo from 'images/whitelist/MIAW.png'
import LUNALogo from 'images/whitelist/LUNA.svg'
import bLUNALogo from 'images/whitelist/bLUNA.png'
import LOTALogo from 'images/whitelist/LOTA.png'
// import ARKKLogo from 'images/whitelist/ARKK.png'
import bETHLogo from 'images/whitelist/bETH.png'
import ANCLogo from 'images/whitelist/ANC.png'
import MIRLogo from 'images/whitelist/MIR.svg'
import mAAPLLogo from 'images/whitelist/mAAPL.svg'
import mABNBLogo from 'images/whitelist/mABNB.png'
import mAMCLogo from 'images/whitelist/mAMC.svg'
import mAMDLogo from 'images/whitelist/mAMD.png'
import mAMZNLogo from 'images/whitelist/mAMZN.svg'
import mBABALogo from 'images/whitelist/mBABA.svg'
import mBTCLogo from 'images/whitelist/mBTC.png'
import mCOINLogo from 'images/whitelist/mCOIN.png'
import mDOTLogo from 'images/whitelist/mDOT.png'
import mETHLogo from 'images/whitelist/mETH.png'
import mFBLogo from 'images/whitelist/mFB.png'
import mGLXYLogo from 'images/whitelist/mGLXY.png'
import mGMELogo from 'images/whitelist/mGME.svg'
import mGOOGLLogo from 'images/whitelist/mGOOGL.svg'
import mGSLogo from 'images/whitelist/mGS.png'
import mIAULogo from 'images/whitelist/mIAU.svg'
import mMSFTLogo from 'images/whitelist/mMSFT.svg'
import mNFLXLogo from 'images/whitelist/mNFLX.svg'
import mQQQLogo from 'images/whitelist/mQQQ.svg'
import mSLVLogo from 'images/whitelist/mSLV.svg'
import mSPYLogo from 'images/whitelist/mSPY.svg'
import mSQLogo from 'images/whitelist/mSQ.png'
import mTSLALogo from 'images/whitelist/mTSLA.svg'
import mTWTRLogo from 'images/whitelist/mTWTR.svg'
import mUSOLogo from 'images/whitelist/mUSO.svg'
import mVIXYLogo from 'images/whitelist/mVIXY.svg'
import DPHLogo from 'images/whitelist/DPH.png'
import MINELogo from 'images/whitelist/MINE.png'
import SPECLogo from 'images/whitelist/SPEC.png'
//import ALTELogo from 'images/whitelist/ALTE.png'
import TWDLogo from 'images/whitelist/TWD.png'
import STTLogo from 'images/whitelist/STT.png'
import VKRLogo from 'images/whitelist/VKR.png'

import { ContractAddr, TokenDenomEnum } from 'types'

const mainnetTokenList: TokenType<ContractAddr | TokenDenomEnum>[] = [
  {
    symbol: 'MIAW',
    name: 'MIAW Token',
    logo: MIAWLogo,
    contractOrDenom:
      'terra1vtr50tw0pgqpes34zqu60n554p9x4950wk8f63' as ContractAddr,
    pair_ust: 'terra12mzh5cp6tgc65t2cqku5zvkjj8xjtuv5v9whyd' as ContractAddr,
    lp_ust: 'terra1hvz34zmk4h6k896t94vd8d5qjdchhnkdndunzx' as ContractAddr,
  },
  {
    symbol: 'Luna',
    name: 'Luna',
    logo: LUNALogo,
    contractOrDenom: TokenDenomEnum.uluna,
    pair_ust: 'terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6' as ContractAddr,
    lp_ust: 'terra17dkr9rnmtmu7x4azrpupukvur2crnptyfvsrvr' as ContractAddr,
  },
  {
    symbol: 'bLuna',
    name: 'Anchor bLuna',
    logo: bLUNALogo,
    contractOrDenom:
      'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp' as ContractAddr,
    lp_luna: 'terra1nuy34nwnsh53ygpc4xprlj263cztw7vc99leh2' as ContractAddr,
    pair_luna: 'terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p' as ContractAddr,
  },
  {
    symbol: 'TWD',
    name: 'Terra World Token',
    logo: TWDLogo,
    contractOrDenom:
      'terra19djkaepjjswucys4npd5ltaxgsntl7jf0xz7w6' as ContractAddr,
    pair_ust: 'terra1etdkg9p0fkl8zal6ecp98kypd32q8k3ryced9d' as ContractAddr,
    lp_ust: 'terra1c9wr85y8p8989tr58flz5gjkqp8q2r6murwpm9' as ContractAddr,
  },
  {
    symbol: 'STT',
    name: 'StarTerra',
    logo: STTLogo,
    contractOrDenom:
      'terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n' as ContractAddr,
    pair_ust: 'terra19pg6d7rrndg4z4t0jhcd7z9nhl3p5ygqttxjll' as ContractAddr,
    lp_ust: 'terra1uwhf02zuaw7grj6gjs7pxt5vuwm79y87ct5p70' as ContractAddr,
  },
  // {
  //   symbol: 'ARKK',
  //   name: 'ARK Innovation ETF',
  //   logo: ARKKLogo,
  //   contractOrDenom:
  //     'terra1qqfx5jph0rsmkur2zgzyqnfucra45rtjae5vh6' as ContractAddr,
  //   lp_ust: 'terra1veqh8yc55mhw0ttjr5h6g9a6r9nylmrc0nzhr7' as ContractAddr,
  //   pair_ust: 'terra1a5cc08jt5knh0yx64pg6dtym4c4l8t63rhlag3' as ContractAddr,
  // },
  {
    symbol: 'LOTA',
    name: 'loterra',
    logo: LOTALogo,
    contractOrDenom:
      'terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr' as ContractAddr,
    lp_ust: 'terra1t4xype7nzjxrzttuwuyh9sglwaaeszr8l78u6e' as ContractAddr,
    pair_ust: 'terra1pn20mcwnmeyxf68vpt3cyel3n57qm9mp289jta' as ContractAddr,
  },
  {
    symbol: 'bETH',
    name: 'Bonded ETH',
    logo: bETHLogo,
    contractOrDenom:
      'terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun' as ContractAddr,
    lp_ust: 'terra1jvewsf7922dm47wr872crumps7ktxd7srwcgte' as ContractAddr,
    pair_ust: 'terra1c0afrdc5253tkp5wt7rxhuj42xwyf2lcre0s7c' as ContractAddr,
  },
  {
    symbol: 'ANC',
    name: 'Anchor Token',
    logo: ANCLogo,
    contractOrDenom:
      'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76' as ContractAddr,
    lp_ust: 'terra1gecs98vcuktyfkrve9czrpgtg0m3aq586x6gzm' as ContractAddr,
    pair_ust: 'terra1gm5p3ner9x9xpwugn9sp6gvhd0lwrtkyrecdn3' as ContractAddr,
  },
  {
    symbol: 'MIR',
    name: 'Mirror',
    logo: MIRLogo,
    contractOrDenom:
      'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6' as ContractAddr,
    lp_ust: 'terra17gjf2zehfvnyjtdgua9p9ygquk6gukxe7ucgwh' as ContractAddr,
    pair_ust: 'terra1amv303y8kzxuegvurh0gug2xe9wkgj65enq2ux' as ContractAddr,
  },
  {
    symbol: 'mAAPL',
    name: 'Apple Inc.',
    logo: mAAPLLogo,
    contractOrDenom:
      'terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz' as ContractAddr,
    lp_ust: 'terra122asauhmv083p02rhgyp7jn7kmjjm4ksexjnks' as ContractAddr,
    pair_ust: 'terra1774f8rwx76k7ruy0gqnzq25wh7lmd72eg6eqp5' as ContractAddr,
  },
  {
    symbol: 'mABNB',
    name: 'Airbnb Inc.',
    logo: mABNBLogo,
    contractOrDenom:
      'terra1g4x2pzmkc9z3mseewxf758rllg08z3797xly0n' as ContractAddr,
    lp_ust: 'terra1jmauv302lfvpdfau5nhzy06q0j2f9te4hy2d07' as ContractAddr,
    pair_ust: 'terra1gq7lq389w4dxqtkxj03wp0fvz0cemj0ek5wwmm' as ContractAddr,
  },
  {
    symbol: 'mAMC',
    name: 'AMC Entertainment Holdings Inc.',
    logo: mAMCLogo,
    contractOrDenom:
      'terra1qelfthdanju7wavc5tq0k5r0rhsyzyyrsn09qy' as ContractAddr,
    lp_ust: 'terra1mtvslkm2tgsmh908dsfksnqu7r7lulh24a6knv' as ContractAddr,
    pair_ust: 'terra1uenpalqlmfaf4efgtqsvzpa3gh898d9h2a232g' as ContractAddr,
  },
  {
    symbol: 'mAMD',
    name: 'Advanced Micro Devices, Inc.',
    logo: mAMDLogo,
    contractOrDenom:
      'terra18ej5nsuu867fkx4tuy2aglpvqjrkcrjjslap3z' as ContractAddr,
    lp_ust: 'terra1m8mr9u3su46ezxwf7z7xnvm0jsapl2jd8vgefh' as ContractAddr,
    pair_ust: 'terra18cxcwv0theanknfztzww8ft9pzfgkmf2xrqy23' as ContractAddr,
  },
  {
    symbol: 'mAMZN',
    name: 'Amazon.com, Inc.',
    logo: mAMZNLogo,
    contractOrDenom:
      'terra165nd2qmrtszehcfrntlplzern7zl4ahtlhd5t2' as ContractAddr,
    lp_ust: 'terra1q7m2qsj3nzlz5ng25z5q5w5qcqldclfe3ljup9' as ContractAddr,
    pair_ust: 'terra1vkvmvnmex90wanque26mjvay2mdtf0rz57fm6d' as ContractAddr,
  },
  {
    symbol: 'mBABA',
    name: 'Alibaba Group Holding Limited',
    logo: mBABALogo,
    contractOrDenom:
      'terra1w7zgkcyt7y4zpct9dw8mw362ywvdlydnum2awa' as ContractAddr,
    lp_ust: 'terra1stfeev27wdf7er2uja34gsmrv58yv397dlxmyn' as ContractAddr,
    pair_ust: 'terra1afdz4l9vsqddwmjqxmel99atu4rwscpfjm4yfp' as ContractAddr,
  },
  {
    symbol: 'mBTC',
    name: 'Bitcoin',
    logo: mBTCLogo,
    contractOrDenom:
      'terra1rhhvx8nzfrx5fufkuft06q5marfkucdqwq5sjw' as ContractAddr,
    lp_ust: 'terra1d34edutzwcz6jgecgk26mpyynqh74j3emdsnq5' as ContractAddr,
    pair_ust: 'terra1prfcyujt9nsn5kfj5n925sfd737r2n8tk5lmpv' as ContractAddr,
  },
  {
    symbol: 'mCOIN',
    name: 'Coinbase Global, Inc.',
    logo: mCOINLogo,
    contractOrDenom:
      'terra18wayjpyq28gd970qzgjfmsjj7dmgdk039duhph' as ContractAddr,
    lp_ust: 'terra1ktckr8v7judrr6wkwv476pwsv8mht0zqzw2t0h' as ContractAddr,
    pair_ust: 'terra1h7t2yq00rxs8a78nyrnhlvp0ewu8vnfnx5efsl' as ContractAddr,
  },
  {
    symbol: 'mDOT',
    name: 'Polkadot',
    logo: mDOTLogo,
    contractOrDenom:
      'terra19ya4jpvjvvtggepvmmj6ftmwly3p7way0tt08r' as ContractAddr,
    lp_ust: 'terra1p60datmmf25wgssguv65ltds3z6ea3me74nm2e' as ContractAddr,
    pair_ust: 'terra17rvtq0mjagh37kcmm4lmpz95ukxwhcrrltgnvc' as ContractAddr,
  },
  {
    symbol: 'mETH',
    name: 'Ether',
    logo: mETHLogo,
    contractOrDenom:
      'terra1dk3g53js3034x4v5c3vavhj2738une880yu6kx' as ContractAddr,
    lp_ust: 'terra16auz7uhnuxrj2dzrynz2elthx5zpps5gs6tyln' as ContractAddr,
    pair_ust: 'terra14fyt2g3umeatsr4j4g2rs8ca0jceu3k0mcs7ry' as ContractAddr,
  },
  {
    symbol: 'mFB',
    name: 'Facebook Inc.',
    logo: mFBLogo,
    contractOrDenom:
      'terra1mqsjugsugfprn3cvgxsrr8akkvdxv2pzc74us7' as ContractAddr,
    lp_ust: 'terra1jh2dh4g65hptsrwjv53nhsnkwlw8jdrxaxrca0' as ContractAddr,
    pair_ust: 'terra1yl2atgxw422qxahm02p364wtgu7gmeya237pcs' as ContractAddr,
  },
  {
    symbol: 'mGLXY',
    name: 'Galaxy Digital Holdings Ltd',
    logo: mGLXYLogo,
    contractOrDenom:
      'terra1l5lrxtwd98ylfy09fn866au6dp76gu8ywnudls' as ContractAddr,
    lp_ust: 'terra1pjgzke6h5v4nz978z3a92gqajwhn8yyh5kv4zv' as ContractAddr,
    pair_ust: 'terra1ze5f2lm5clq2cdd9y2ve3lglfrq6ap8cqncld8' as ContractAddr,
  },
  {
    symbol: 'mGME',
    name: 'GameStop Corp',
    logo: mGMELogo,
    contractOrDenom:
      'terra1m6j6j9gw728n82k78s0j9kq8l5p6ne0xcc820p' as ContractAddr,
    lp_ust: 'terra1azk43zydh3sdxelg3h4csv4a4uef7fmjy0hu20' as ContractAddr,
    pair_ust: 'terra17eakdtane6d2y7y6v0s79drq7gnhzqan48kxw7' as ContractAddr,
  },
  {
    symbol: 'mGOOGL',
    name: 'Alphabet Inc.',
    logo: mGOOGLLogo,
    contractOrDenom:
      'terra1h8arz2k547uvmpxctuwush3jzc8fun4s96qgwt' as ContractAddr,
    lp_ust: 'terra1falkl6jy4087h4z567y2l59defm9acmwcs70ts' as ContractAddr,
    pair_ust: 'terra1u56eamzkwzpm696hae4kl92jm6xxztar9uhkea' as ContractAddr,
  },
  {
    symbol: 'mGS',
    name: 'Goldman Sachs Group Inc.',
    logo: mGSLogo,
    contractOrDenom:
      'terra137drsu8gce5thf6jr5mxlfghw36rpljt3zj73v' as ContractAddr,
    lp_ust: 'terra17smg3rl9vdpawwpe7ex4ea4xm6q038gp2chge5' as ContractAddr,
    pair_ust: 'terra108ukjf6ekezuc52t9keernlqxtmzpj4wf7rx0h' as ContractAddr,
  },
  {
    symbol: 'mIAU',
    name: 'iShares Gold Trust',
    logo: mIAULogo,
    contractOrDenom:
      'terra10h7ry7apm55h4ez502dqdv9gr53juu85nkd4aq' as ContractAddr,
    lp_ust: 'terra1ndlx5ndkknvmgj6s5ggmdlhjjsz0w6wrnwn5cf' as ContractAddr,
    pair_ust: 'terra15kkctr4eug9txq7v6ks6026yd4zjkrm3mc0nkp' as ContractAddr,
  },
  {
    symbol: 'mMSFT',
    name: 'Microsoft Corporation',
    logo: mMSFTLogo,
    contractOrDenom:
      'terra1227ppwxxj3jxz8cfgq00jgnxqcny7ryenvkwj6' as ContractAddr,
    lp_ust: 'terra14uaqudeylx6tegamqmygh85lfq8qg2jmg7uucc' as ContractAddr,
    pair_ust: 'terra10ypv4vq67ns54t5ur3krkx37th7j58paev0qhd' as ContractAddr,
  },
  {
    symbol: 'mNFLX',
    name: 'Netflix, Inc.',
    logo: mNFLXLogo,
    contractOrDenom:
      'terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k' as ContractAddr,
    lp_ust: 'terra1mwu3cqzvhygqg7vrsa6kfstgg9d6yzkgs6yy3t' as ContractAddr,
    pair_ust: 'terra1yppvuda72pvmxd727knemvzsuergtslj486rdq' as ContractAddr,
  },
  {
    symbol: 'mQQQ',
    name: 'Invesco QQQ Trust',
    logo: mQQQLogo,
    contractOrDenom:
      'terra1csk6tc7pdmpr782w527hwhez6gfv632tyf72cp' as ContractAddr,
    lp_ust: 'terra16j09nh806vaql0wujw8ktmvdj7ph8h09ltjs2r' as ContractAddr,
    pair_ust: 'terra1dkc8075nv34k2fu6xn6wcgrqlewup2qtkr4ymu' as ContractAddr,
  },
  {
    symbol: 'mSLV',
    name: 'iShares Silver Trust',
    logo: mSLVLogo,
    contractOrDenom:
      'terra1kscs6uhrqwy6rx5kuw5lwpuqvm3t6j2d6uf2lp' as ContractAddr,
    lp_ust: 'terra178cf7xf4r9d3z03tj3pftewmhx0x2p77s0k6yh' as ContractAddr,
    pair_ust: 'terra1f6d9mhrsl5t6yxqnr4rgfusjlt3gfwxdveeyuy' as ContractAddr,
  },
  {
    symbol: 'mSPY',
    name: 'SPDR S&P 500',
    logo: mSPYLogo,
    contractOrDenom:
      'terra1aa00lpfexyycedfg5k2p60l9djcmw0ue5l8fhc' as ContractAddr,
    lp_ust: 'terra1jqqegd35rg2gjde54adpj3t6ecu0khfeaarzy9' as ContractAddr,
    pair_ust: 'terra14hklnm2ssaexjwkcfhyyyzvpmhpwx6x6lpy39s' as ContractAddr,
  },
  {
    symbol: 'mSQ',
    name: 'Square, Inc.',
    logo: mSQLogo,
    contractOrDenom:
      'terra1u43zu5amjlsgty5j64445fr9yglhm53m576ugh' as ContractAddr,
    lp_ust: 'terra1mv3pgkzs4krcennqj442jscg6jv84cejrs50n2' as ContractAddr,
    pair_ust: 'terra1u3pknaazmmudfwxsclcfg3zy74s3zd3anc5m52' as ContractAddr,
  },
  {
    symbol: 'mTSLA',
    name: 'Tesla, Inc.',
    logo: mTSLALogo,
    contractOrDenom:
      'terra14y5affaarufk3uscy2vr6pe6w6zqf2wpjzn5sh' as ContractAddr,
    lp_ust: 'terra1ygazp9w7tx64rkx5wmevszu38y5cpg6h3fk86e' as ContractAddr,
    pair_ust: 'terra1pdxyk2gkykaraynmrgjfq2uu7r9pf5v8x7k4xk' as ContractAddr,
  },
  {
    symbol: 'mTWTR',
    name: 'Twitter, Inc.',
    logo: mTWTRLogo,
    contractOrDenom:
      'terra1cc3enj9qgchlrj34cnzhwuclc4vl2z3jl7tkqg' as ContractAddr,
    lp_ust: 'terra1fc5a5gsxatjey9syq93c2n3xq90n06t60nkj6l' as ContractAddr,
    pair_ust: 'terra1ea9js3y4l7vy0h46k4e5r5ykkk08zc3fx7v4t8' as ContractAddr,
  },
  {
    symbol: 'mUSO',
    name: 'United States Oil Fund, LP',
    logo: mUSOLogo,
    contractOrDenom:
      'terra1lvmx8fsagy70tv0fhmfzdw9h6s3sy4prz38ugf' as ContractAddr,
    lp_ust: 'terra1utf3tm35qk6fkft7ltcnscwml737vfz7xghwn5' as ContractAddr,
    pair_ust: 'terra1zey9knmvs2frfrjnf4cfv4prc4ts3mrsefstrj' as ContractAddr,
  },
  {
    symbol: 'mVIXY',
    name: 'ProShares VIX Short-Term Futures ETF',
    logo: mVIXYLogo,
    contractOrDenom:
      'terra19cmt6vzvhnnnfsmccaaxzy2uaj06zjktu6yzjx' as ContractAddr,
    lp_ust: 'terra1ekd58y58vq4gmxlzpc27dwuhw7wmms928ftuep' as ContractAddr,
    pair_ust: 'terra1krny2jc0tpkzeqfmswm7ss8smtddxqm3mxxsjm' as ContractAddr,
  },
  {
    symbol: 'DPH',
    name: 'Digipharm',
    logo: DPHLogo,
    contractOrDenom:
      'terra17jnhankdfl8vyzj6vejt7ag8uz0cjc9crkl2h7' as ContractAddr,
    lp_ust: 'terra1k5kumxd24cyvhf52r5u4ywlr3ztktj657wnf7a' as ContractAddr,
    pair_ust: 'terra1zz39wfyyqt4tjz7dz6p7s9c8pwmcw2xzde3xl8' as ContractAddr,
  },
  {
    symbol: 'MINE',
    name: 'Pylon MINE Token',
    logo: MINELogo,
    contractOrDenom:
      'terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy' as ContractAddr,
    lp_ust: 'terra1rqkyau9hanxtn63mjrdfhpnkpddztv3qav0tq2' as ContractAddr,
    pair_ust: 'terra178jydtjvj4gw8earkgnqc80c3hrmqj4kw2welz' as ContractAddr,
  },
  {
    symbol: 'SPEC',
    name: 'Spectrum Token',
    logo: SPECLogo,
    contractOrDenom:
      'terra1s5eczhe0h0jutf46re52x5z4r03c8hupacxmdr' as ContractAddr,
    lp_ust: 'terra1y9kxxm97vu4ex3uy0rgdr5h2vt7aze5sqx7jyl' as ContractAddr,
    pair_ust: 'terra1tn8ejzw8kpuc87nu42f6qeyen4c7qy35tl8t20' as ContractAddr,
  },
  {
    symbol: 'VKR',
    name: 'Valkyrie Token',
    logo: VKRLogo,
    contractOrDenom:
      'terra1dy9kmlm4anr92e42mrkjwzyvfqwz66un00rwr5' as ContractAddr,
    lp_ust: 'terra17fysmcl52xjrs8ldswhz7n6mt37r9cmpcguack' as ContractAddr,
    pair_ust: 'terra1e59utusv5rspqsu8t37h5w887d9rdykljedxw0' as ContractAddr,
  },
  // {
  //   symbol: 'ALTE',
  //   name: 'Spectrum Token',
  //   logo: ALTELogo,
  //   contractOrDenom:
  //     'terra15tztd7v9cmv0rhyh37g843j8vfuzp8kw0k5lqv' as ContractAddr,
  //   lp_ust: 'terra1x3musrr03tl3dy9xhagm6r5nthwwxgx0hezc79' as ContractAddr,
  //   pair_ust: 'terra18adm0emn6j3pnc90ldechhun62y898xrdmfgfz' as ContractAddr,
  // },
]

const testnetTokenList: TokenType[] = [
  {
    symbol: 'MIAW',
    name: 'MIAW Token',
    logo: MIAWLogo,
    contractOrDenom:
      'terra1qu5fractk8lgq23gh8efvlywal6rsd9ds8r73l' as ContractAddr,
    pair_ust: 'terra1834ku9y7s2swyp2r090pc29c4s06hy9n9drwvy' as ContractAddr,
    lp_ust: 'terra18e4mudt7kdml6lma5fhsydszxpexmxf2ez9hpn' as ContractAddr,
  },
]

const mainnetLpOfLpList: LpofLpType[] = [
  {
    token_0_LogoList: [LUNALogo, bLUNALogo],
    token_0_Contract:
      'terra1nuy34nwnsh53ygpc4xprlj263cztw7vc99leh2' as ContractAddr,
    token_0_Symbol: 'Luna-bLuna Lp',
    token_0_Pair:
      'terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p' as ContractAddr,
    token_0_Combined: [
      TokenDenomEnum.uluna,
      'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp' as ContractAddr,
    ],
    token_0_ProvideSymbol: 'bLuna',
    token_1_LogoList: [LUNALogo, USTLogo],
    token_1_Contract:
      'terra17dkr9rnmtmu7x4azrpupukvur2crnptyfvsrvr' as ContractAddr,
    token_1_Pair:
      'terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6' as ContractAddr,
    token_1_Combined: [TokenDenomEnum.uluna, TokenDenomEnum.uusd],
    token_1_Symbol: 'Luna-UST Lp',
    token_1_ProvideSymbol: 'Luna',
    lpOfLp_LpTicker: 'LUNAHODL',
    lpOfLp_Lp: 'terra1qxlp0q3z20llu0gz9c7urzw7rmlnchm23yk8xc' as ContractAddr,
    lpOfLp_Pair: 'terra1wrwf3um5vm30vpwnlpvjzgwpf5fjknt68nah05' as ContractAddr,
  },
]

const mainnetLpStakingList: LpStakingType[] = [
  {
    tokenLogo: MIAWLogo,
    tokenContract:
      'terra1vtr50tw0pgqpes34zqu60n554p9x4950wk8f63' as ContractAddr,
    nativeDenomLogo: USTLogo,
    nativeDenom: TokenDenomEnum.uusd,
    lpContract: 'terra1hvz34zmk4h6k896t94vd8d5qjdchhnkdndunzx' as ContractAddr,
    lpPair: 'terra12mzh5cp6tgc65t2cqku5zvkjj8xjtuv5v9whyd' as ContractAddr,
    lpStaking: 'terra1a7fwra93sw8xy5wz779crks07u3ttf3u4mslfp' as ContractAddr,
  },
]

const testnetLpStakingList: LpStakingType[] = [
  {
    tokenLogo: MIAWLogo,
    tokenContract:
      'terra1qu5fractk8lgq23gh8efvlywal6rsd9ds8r73l' as ContractAddr,
    nativeDenomLogo: USTLogo,
    nativeDenom: TokenDenomEnum.uusd,
    lpContract: 'terra18e4mudt7kdml6lma5fhsydszxpexmxf2ez9hpn' as ContractAddr,
    lpPair: 'terra1834ku9y7s2swyp2r090pc29c4s06hy9n9drwvy' as ContractAddr,
    lpStaking: 'terra17cvsfp5kn2kucvl44vp4r3cwy4aekvrdnmsy5x' as ContractAddr,
  },
]

const address = {
  miawDeveloper: 'terra1mxwpyavs4v5rpwndh3uc90e3qaw2wqqndnmt3j',
}

export default {
  mainnetTokenList,
  testnetTokenList,
  mainnetLpOfLpList,
  mainnetLpStakingList,
  testnetLpStakingList,
  address,
}
