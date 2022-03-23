import { TokenType, LpofLpType, LpStakingType, DexEnum } from 'types/network'

import USTLogo from 'images/whitelist/UST.png'
import MIAWLogo from 'images/whitelist/MIAW.png'
import LUNALogo from 'images/whitelist/LUNA.svg'
import bLUNALogo from 'images/whitelist/bLUNA.png'
import LOTALogo from 'images/whitelist/LOTA.png'
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
import ALTELogo from 'images/whitelist/ALTE.png'
import TWDLogo from 'images/whitelist/TWD.png'
import STTLogo from 'images/whitelist/STT.png'
import VKRLogo from 'images/whitelist/VKR.png'
import PSILogo from 'images/whitelist/PSI.png'
import KUJILogo from 'images/whitelist/KUJI.png'
import ASTROLogo from 'images/whitelist/ASTRO.png'
import WHALELogo from 'images/whitelist/WHALE.svg'
import APOLLOLogo from 'images/whitelist/APOLLO.png'
import LUNILogo from 'images/whitelist/LUNI.png'
import TLANDLogo from 'images/whitelist/TLAND.png'
import ORNELogo from 'images/whitelist/ORNE.png'
import PLYLogo from 'images/whitelist/PLY.png'
import tSHIBALogo from 'images/whitelist/tSHIBA.png'
import XTRALogo from 'images/whitelist/XTRA.png'
import aUSTLogo from 'images/whitelist/aUST.png'
import GLOWLogo from 'images/whitelist/GLOW.png'
import ATLOLogo from 'images/whitelist/ATLO.svg'

import {
  TokenKeyEnum,
  ContractAddr,
  TokenDenomEnum,
  TokenInfoType,
  TokenInfoGoupEnum,
} from 'types'

const tokenInfo: Record<TokenKeyEnum, TokenInfoType> = {
  [TokenKeyEnum.ATLO]: {
    symbol: 'ATLO',
    name: 'ATLO Token',
    logo: ATLOLogo,
    contractOrDenom:
      'terra1cl7whtrqmz5ldr553q69qahck8xvk80fm33qjx' as ContractAddr,
  },
  [TokenKeyEnum.GLOW]: {
    symbol: 'GLOW',
    name: 'GLOW Token',
    logo: GLOWLogo,
    contractOrDenom:
      'terra13zx49nk8wjavedjzu8xkk95r3t0ta43c9ptul7' as ContractAddr,
  },
  [TokenKeyEnum.XTRA]: {
    symbol: 'XTRA',
    name: 'XTRA Token',
    logo: XTRALogo,
    contractOrDenom:
      'terra1kvjscdgwuvwc6uzm4rqfjl6nlmuhj28tequlnc' as ContractAddr,
  },
  [TokenKeyEnum.aUST]: {
    symbol: 'aUST',
    name: 'aUST Token',
    logo: aUSTLogo,
    contractOrDenom:
      'terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu' as ContractAddr,
    group: TokenInfoGoupEnum.anc,
  },
  [TokenKeyEnum.MIAW]: {
    symbol: 'MIAW',
    name: 'MIAW Token',
    logo: MIAWLogo,
    contractOrDenom:
      'terra1vtr50tw0pgqpes34zqu60n554p9x4950wk8f63' as ContractAddr,
  },
  [TokenKeyEnum.UST]: {
    symbol: 'UST',
    name: 'UST',
    logo: USTLogo,
    contractOrDenom: TokenDenomEnum.uusd,
  },
  [TokenKeyEnum.Luna]: {
    symbol: 'Luna',
    name: 'Luna',
    logo: LUNALogo,
    contractOrDenom: TokenDenomEnum.uluna,
  },
  [TokenKeyEnum.bLuna]: {
    symbol: 'bLuna',
    name: 'Anchor bLuna',
    logo: bLUNALogo,
    contractOrDenom:
      'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp' as ContractAddr,
    group: TokenInfoGoupEnum.anc,
  },
  [TokenKeyEnum.TWD]: {
    symbol: 'TWD',
    name: 'Terra World Token',
    logo: TWDLogo,
    contractOrDenom:
      'terra19djkaepjjswucys4npd5ltaxgsntl7jf0xz7w6' as ContractAddr,
  },
  [TokenKeyEnum.STT]: {
    symbol: 'STT',
    name: 'StarTerra',
    logo: STTLogo,
    contractOrDenom:
      'terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n' as ContractAddr,
  },
  [TokenKeyEnum.LOTA]: {
    symbol: 'LOTA',
    name: 'loterra',
    logo: LOTALogo,
    contractOrDenom:
      'terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr' as ContractAddr,
  },
  [TokenKeyEnum.bETH]: {
    symbol: 'bETH',
    name: 'Bonded ETH',
    logo: bETHLogo,
    contractOrDenom:
      'terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun' as ContractAddr,
    group: TokenInfoGoupEnum.anc,
  },
  [TokenKeyEnum.ANC]: {
    symbol: 'ANC',
    name: 'Anchor Token',
    logo: ANCLogo,
    contractOrDenom:
      'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76' as ContractAddr,
    group: TokenInfoGoupEnum.anc,
  },
  [TokenKeyEnum.MIR]: {
    symbol: 'MIR',
    name: 'Mirror',
    logo: MIRLogo,
    contractOrDenom:
      'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mAAPL]: {
    symbol: 'mAAPL',
    name: 'Apple Inc.',
    logo: mAAPLLogo,
    contractOrDenom:
      'terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mABNB]: {
    symbol: 'mABNB',
    name: 'Airbnb Inc.',
    logo: mABNBLogo,
    contractOrDenom:
      'terra1g4x2pzmkc9z3mseewxf758rllg08z3797xly0n' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mAMC]: {
    symbol: 'mAMC',
    name: 'AMC Entertainment Holdings Inc.',
    logo: mAMCLogo,
    contractOrDenom:
      'terra1qelfthdanju7wavc5tq0k5r0rhsyzyyrsn09qy' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mAMD]: {
    symbol: 'mAMD',
    name: 'Advanced Micro Devices, Inc.',
    logo: mAMDLogo,
    contractOrDenom:
      'terra18ej5nsuu867fkx4tuy2aglpvqjrkcrjjslap3z' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mAMZN]: {
    symbol: 'mAMZN',
    name: 'Amazon.com, Inc.',
    logo: mAMZNLogo,
    contractOrDenom:
      'terra165nd2qmrtszehcfrntlplzern7zl4ahtlhd5t2' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mBABA]: {
    symbol: 'mBABA',
    name: 'Alibaba Group Holding Limited',
    logo: mBABALogo,
    contractOrDenom:
      'terra1w7zgkcyt7y4zpct9dw8mw362ywvdlydnum2awa' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mBTC]: {
    symbol: 'mBTC',
    name: 'Bitcoin',
    logo: mBTCLogo,
    contractOrDenom:
      'terra1rhhvx8nzfrx5fufkuft06q5marfkucdqwq5sjw' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mCOIN]: {
    symbol: 'mCOIN',
    name: 'Coinbase Global, Inc.',
    logo: mCOINLogo,
    contractOrDenom:
      'terra18wayjpyq28gd970qzgjfmsjj7dmgdk039duhph' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mDOT]: {
    symbol: 'mDOT',
    name: 'Polkadot',
    logo: mDOTLogo,
    contractOrDenom:
      'terra19ya4jpvjvvtggepvmmj6ftmwly3p7way0tt08r' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mETH]: {
    symbol: 'mETH',
    name: 'Ether',
    logo: mETHLogo,
    contractOrDenom:
      'terra1dk3g53js3034x4v5c3vavhj2738une880yu6kx' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mFB]: {
    symbol: 'mFB',
    name: 'Facebook Inc.',
    logo: mFBLogo,
    contractOrDenom:
      'terra1mqsjugsugfprn3cvgxsrr8akkvdxv2pzc74us7' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mGLXY]: {
    symbol: 'mGLXY',
    name: 'Galaxy Digital Holdings Ltd',
    logo: mGLXYLogo,
    contractOrDenom:
      'terra1l5lrxtwd98ylfy09fn866au6dp76gu8ywnudls' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mGME]: {
    symbol: 'mGME',
    name: 'GameStop Corp',
    logo: mGMELogo,
    contractOrDenom:
      'terra1m6j6j9gw728n82k78s0j9kq8l5p6ne0xcc820p' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mGOOGL]: {
    symbol: 'mGOOGL',
    name: 'Alphabet Inc.',
    logo: mGOOGLLogo,
    contractOrDenom:
      'terra1h8arz2k547uvmpxctuwush3jzc8fun4s96qgwt' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mGS]: {
    symbol: 'mGS',
    name: 'Goldman Sachs Group Inc.',
    logo: mGSLogo,
    contractOrDenom:
      'terra137drsu8gce5thf6jr5mxlfghw36rpljt3zj73v' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mIAU]: {
    symbol: 'mIAU',
    name: 'iShares Gold Trust',
    logo: mIAULogo,
    contractOrDenom:
      'terra10h7ry7apm55h4ez502dqdv9gr53juu85nkd4aq' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mMSFT]: {
    symbol: 'mMSFT',
    name: 'Microsoft Corporation',
    logo: mMSFTLogo,
    contractOrDenom:
      'terra1227ppwxxj3jxz8cfgq00jgnxqcny7ryenvkwj6' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mNFLX]: {
    symbol: 'mNFLX',
    name: 'Netflix, Inc.',
    logo: mNFLXLogo,
    contractOrDenom:
      'terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mQQQ]: {
    symbol: 'mQQQ',
    name: 'Invesco QQQ Trust',
    logo: mQQQLogo,
    contractOrDenom:
      'terra1csk6tc7pdmpr782w527hwhez6gfv632tyf72cp' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mSLV]: {
    symbol: 'mSLV',
    name: 'iShares Silver Trust',
    logo: mSLVLogo,
    contractOrDenom:
      'terra1kscs6uhrqwy6rx5kuw5lwpuqvm3t6j2d6uf2lp' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mSPY]: {
    symbol: 'mSPY',
    name: 'SPDR S&P 500',
    logo: mSPYLogo,
    contractOrDenom:
      'terra1aa00lpfexyycedfg5k2p60l9djcmw0ue5l8fhc' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mSQ]: {
    symbol: 'mSQ',
    name: 'Square, Inc.',
    logo: mSQLogo,
    contractOrDenom:
      'terra1u43zu5amjlsgty5j64445fr9yglhm53m576ugh' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mTSLA]: {
    symbol: 'mTSLA',
    name: 'Tesla, Inc.',
    logo: mTSLALogo,
    contractOrDenom:
      'terra14y5affaarufk3uscy2vr6pe6w6zqf2wpjzn5sh' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mTWTR]: {
    symbol: 'mTWTR',
    name: 'Twitter, Inc.',
    logo: mTWTRLogo,
    contractOrDenom:
      'terra1cc3enj9qgchlrj34cnzhwuclc4vl2z3jl7tkqg' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mUSO]: {
    symbol: 'mUSO',
    name: 'United States Oil Fund, LP',
    logo: mUSOLogo,
    contractOrDenom:
      'terra1lvmx8fsagy70tv0fhmfzdw9h6s3sy4prz38ugf' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mVIXY]: {
    symbol: 'mVIXY',
    name: 'ProShares VIX Short-Term Futures ETF',
    logo: mVIXYLogo,
    contractOrDenom:
      'terra19cmt6vzvhnnnfsmccaaxzy2uaj06zjktu6yzjx' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.DPH]: {
    symbol: 'DPH',
    name: 'Digipharm',
    logo: DPHLogo,
    contractOrDenom:
      'terra17jnhankdfl8vyzj6vejt7ag8uz0cjc9crkl2h7' as ContractAddr,
  },
  [TokenKeyEnum.MINE]: {
    symbol: 'MINE',
    name: 'Pylon MINE Token',
    logo: MINELogo,
    contractOrDenom:
      'terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy' as ContractAddr,
  },
  [TokenKeyEnum.SPEC]: {
    symbol: 'SPEC',
    name: 'Spectrum Token',
    logo: SPECLogo,
    contractOrDenom:
      'terra1s5eczhe0h0jutf46re52x5z4r03c8hupacxmdr' as ContractAddr,
  },
  [TokenKeyEnum.VKR]: {
    symbol: 'VKR',
    name: 'Valkyrie Token',
    logo: VKRLogo,
    contractOrDenom:
      'terra1dy9kmlm4anr92e42mrkjwzyvfqwz66un00rwr5' as ContractAddr,
  },
  [TokenKeyEnum.PSI]: {
    symbol: 'PSI',
    name: 'Nexus Psi Token',
    logo: PSILogo,
    contractOrDenom:
      'terra12897djskt9rge8dtmm86w654g7kzckkd698608' as ContractAddr,
  },
  [TokenKeyEnum.KUJI]: {
    symbol: 'KUJI',
    name: 'Kujira KUJI Token',
    logo: KUJILogo,
    contractOrDenom:
      'terra1xfsdgcemqwxp4hhnyk4rle6wr22sseq7j07dnn' as ContractAddr,
  },
  [TokenKeyEnum.ALTE]: {
    symbol: 'ALTE',
    name: 'Altered',
    logo: ALTELogo,
    contractOrDenom:
      'terra15tztd7v9cmv0rhyh37g843j8vfuzp8kw0k5lqv' as ContractAddr,
  },
  [TokenKeyEnum.ASTRO]: {
    symbol: 'ASTRO',
    name: 'Astroport',
    logo: ASTROLogo,
    contractOrDenom:
      'terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3' as ContractAddr,
  },
  [TokenKeyEnum.WHALE]: {
    symbol: 'WHALE',
    name: 'White Whale',
    logo: WHALELogo,
    contractOrDenom:
      'terra1php5m8a6qd68z02t3zpw4jv2pj4vgw4wz0t8mz' as ContractAddr,
  },
  [TokenKeyEnum.APOLLO]: {
    symbol: 'APOLLO',
    name: 'Apollo DAO Token',
    logo: APOLLOLogo,
    contractOrDenom:
      'terra100yeqvww74h4yaejj6h733thgcafdaukjtw397' as ContractAddr,
  },
  [TokenKeyEnum.LUNI]: {
    symbol: 'LUNI',
    name: 'LUNI',
    logo: LUNILogo,
    contractOrDenom:
      'terra1m3tdguf59xq3pa2twk5fjte5g6szj5y9x5npy7' as ContractAddr,
  },
  [TokenKeyEnum.TLAND]: {
    symbol: 'TLAND',
    name: 'TerraLand token',
    logo: TLANDLogo,
    contractOrDenom:
      'terra1r5506ckw5tfr3z52jwlek8vg9sn3yflrqrzfsc' as ContractAddr,
  },
  [TokenKeyEnum.ORNE]: {
    symbol: 'ORNE',
    name: 'Orne',
    logo: ORNELogo,
    contractOrDenom:
      'terra1hnezwjqlhzawcrfysczcxs6xqxu2jawn729kkf' as ContractAddr,
  },
  [TokenKeyEnum.PLY]: {
    symbol: 'PLY',
    name: 'PlayNity token',
    logo: PLYLogo,
    contractOrDenom:
      'terra13awdgcx40tz5uygkgm79dytez3x87rpg4uhnvu' as ContractAddr,
  },
  [TokenKeyEnum.tSHIBA]: {
    symbol: 'tSHIBA',
    name: 'Terra Shiba',
    logo: tSHIBALogo,
    contractOrDenom:
      'terra140k6k2pmh2lmy4q4wyz5znqmtgwvs3gkgfeevq' as ContractAddr,
  },
}

const mainnetTokenList: TokenType[] = [
  {
    ...tokenInfo[TokenKeyEnum.MIAW],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra12mzh5cp6tgc65t2cqku5zvkjj8xjtuv5v9whyd' as ContractAddr,
        lp: 'terra1hvz34zmk4h6k896t94vd8d5qjdchhnkdndunzx' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.ALTE,
        pair: 'terra1c7uxt89gap5gcclvhtqvx3wpd0ee2dpjhf0ct6' as ContractAddr,
        lp: 'terra19umy5s6eal7kekrddw792wmcftxvsktc2wxzpf' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.Luna],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1m6ywlgn6wrjuagcmmezzz2a029gtldhey5k552' as ContractAddr,
        lp: 'terra1m24f7k4g66gnh9f7uncp32p722v0kyt3q4l3u5' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6' as ContractAddr,
        lp: 'terra17dkr9rnmtmu7x4azrpupukvur2crnptyfvsrvr' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.bLuna],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.Luna,
        pair: 'terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w' as ContractAddr,
        lp: 'terra1htw7hm40ch0hacm8qpgd24sus4h0tq3hsseatl' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.Luna,
        pair: 'terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p' as ContractAddr,
        lp: 'terra1nuy34nwnsh53ygpc4xprlj263cztw7vc99leh2' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.TWD],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1etdkg9p0fkl8zal6ecp98kypd32q8k3ryced9d' as ContractAddr,
        lp: 'terra1c9wr85y8p8989tr58flz5gjkqp8q2r6murwpm9' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.STT],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1m95udvvdame93kl6j2mk8d03kc982wqgr75jsr' as ContractAddr,
        lp: 'terra14p4srhzd5zng8vghly5artly0s53dmryvg3qc6' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra19pg6d7rrndg4z4t0jhcd7z9nhl3p5ygqttxjll' as ContractAddr,
        lp: 'terra1uwhf02zuaw7grj6gjs7pxt5vuwm79y87ct5p70' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.LOTA],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1pn20mcwnmeyxf68vpt3cyel3n57qm9mp289jta' as ContractAddr,
        lp: 'terra1t4xype7nzjxrzttuwuyh9sglwaaeszr8l78u6e' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.bETH],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1c0afrdc5253tkp5wt7rxhuj42xwyf2lcre0s7c' as ContractAddr,
        lp: 'terra1jvewsf7922dm47wr872crumps7ktxd7srwcgte' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.ANC],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1qr2k6yjjd5p2kaewqvg93ag74k6gyjr7re37fs' as ContractAddr,
        lp: 'terra1wmaty65yt7mjw6fjfymkd9zsm6atsq82d9arcd' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1gm5p3ner9x9xpwugn9sp6gvhd0lwrtkyrecdn3' as ContractAddr,
        lp: 'terra1gecs98vcuktyfkrve9czrpgtg0m3aq586x6gzm' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.MIR],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra143xxfw5xf62d5m32k3t4eu9s82ccw80lcprzl9' as ContractAddr,
        lp: 'terra17trxzqjetl0q6xxep0s2w743dhw2cay0x47puc' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1amv303y8kzxuegvurh0gug2xe9wkgj65enq2ux' as ContractAddr,
        lp: 'terra17gjf2zehfvnyjtdgua9p9ygquk6gukxe7ucgwh' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mAAPL],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1774f8rwx76k7ruy0gqnzq25wh7lmd72eg6eqp5' as ContractAddr,
        lp: 'terra122asauhmv083p02rhgyp7jn7kmjjm4ksexjnks' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mABNB],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1gq7lq389w4dxqtkxj03wp0fvz0cemj0ek5wwmm' as ContractAddr,
        lp: 'terra1jmauv302lfvpdfau5nhzy06q0j2f9te4hy2d07' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mAMD],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra18cxcwv0theanknfztzww8ft9pzfgkmf2xrqy23' as ContractAddr,
        lp: 'terra1m8mr9u3su46ezxwf7z7xnvm0jsapl2jd8vgefh' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mAMZN],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1vkvmvnmex90wanque26mjvay2mdtf0rz57fm6d' as ContractAddr,
        lp: 'terra1q7m2qsj3nzlz5ng25z5q5w5qcqldclfe3ljup9' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mBABA],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1afdz4l9vsqddwmjqxmel99atu4rwscpfjm4yfp' as ContractAddr,
        lp: 'terra1stfeev27wdf7er2uja34gsmrv58yv397dlxmyn' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mBTC],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1prfcyujt9nsn5kfj5n925sfd737r2n8tk5lmpv' as ContractAddr,
        lp: 'terra1d34edutzwcz6jgecgk26mpyynqh74j3emdsnq5' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mCOIN],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1h7t2yq00rxs8a78nyrnhlvp0ewu8vnfnx5efsl' as ContractAddr,
        lp: 'terra1ktckr8v7judrr6wkwv476pwsv8mht0zqzw2t0h' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mDOT],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra17rvtq0mjagh37kcmm4lmpz95ukxwhcrrltgnvc' as ContractAddr,
        lp: 'terra1p60datmmf25wgssguv65ltds3z6ea3me74nm2e' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mETH],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra14fyt2g3umeatsr4j4g2rs8ca0jceu3k0mcs7ry' as ContractAddr,
        lp: 'terra16auz7uhnuxrj2dzrynz2elthx5zpps5gs6tyln' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mFB],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1yl2atgxw422qxahm02p364wtgu7gmeya237pcs' as ContractAddr,
        lp: 'terra1jh2dh4g65hptsrwjv53nhsnkwlw8jdrxaxrca0' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mGLXY],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1ze5f2lm5clq2cdd9y2ve3lglfrq6ap8cqncld8' as ContractAddr,
        lp: 'terra1pjgzke6h5v4nz978z3a92gqajwhn8yyh5kv4zv' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mGOOGL],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1u56eamzkwzpm696hae4kl92jm6xxztar9uhkea' as ContractAddr,
        lp: 'terra1falkl6jy4087h4z567y2l59defm9acmwcs70ts' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mGS],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra108ukjf6ekezuc52t9keernlqxtmzpj4wf7rx0h' as ContractAddr,
        lp: 'terra17smg3rl9vdpawwpe7ex4ea4xm6q038gp2chge5' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mIAU],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra15kkctr4eug9txq7v6ks6026yd4zjkrm3mc0nkp' as ContractAddr,
        lp: 'terra1ndlx5ndkknvmgj6s5ggmdlhjjsz0w6wrnwn5cf' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mMSFT],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra10ypv4vq67ns54t5ur3krkx37th7j58paev0qhd' as ContractAddr,
        lp: 'terra14uaqudeylx6tegamqmygh85lfq8qg2jmg7uucc' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mNFLX],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1yppvuda72pvmxd727knemvzsuergtslj486rdq' as ContractAddr,
        lp: 'terra1mwu3cqzvhygqg7vrsa6kfstgg9d6yzkgs6yy3t' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mQQQ],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1dkc8075nv34k2fu6xn6wcgrqlewup2qtkr4ymu' as ContractAddr,
        lp: 'terra16j09nh806vaql0wujw8ktmvdj7ph8h09ltjs2r' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mSLV],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1f6d9mhrsl5t6yxqnr4rgfusjlt3gfwxdveeyuy' as ContractAddr,
        lp: 'terra178cf7xf4r9d3z03tj3pftewmhx0x2p77s0k6yh' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mSPY],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra14hklnm2ssaexjwkcfhyyyzvpmhpwx6x6lpy39s' as ContractAddr,
        lp: 'terra1jqqegd35rg2gjde54adpj3t6ecu0khfeaarzy9' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mSQ],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1u3pknaazmmudfwxsclcfg3zy74s3zd3anc5m52' as ContractAddr,
        lp: 'terra1mv3pgkzs4krcennqj442jscg6jv84cejrs50n2' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mTSLA],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1pdxyk2gkykaraynmrgjfq2uu7r9pf5v8x7k4xk' as ContractAddr,
        lp: 'terra1ygazp9w7tx64rkx5wmevszu38y5cpg6h3fk86e' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mTWTR],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1ea9js3y4l7vy0h46k4e5r5ykkk08zc3fx7v4t8' as ContractAddr,
        lp: 'terra1fc5a5gsxatjey9syq93c2n3xq90n06t60nkj6l' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mUSO],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1zey9knmvs2frfrjnf4cfv4prc4ts3mrsefstrj' as ContractAddr,
        lp: 'terra1utf3tm35qk6fkft7ltcnscwml737vfz7xghwn5' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.mVIXY],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1krny2jc0tpkzeqfmswm7ss8smtddxqm3mxxsjm' as ContractAddr,
        lp: 'terra1ekd58y58vq4gmxlzpc27dwuhw7wmms928ftuep' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.MINE],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra134m8n2epp0n40qr08qsvvrzycn2zq4zcpmue48' as ContractAddr,
        lp: 'terra16unvjel8vvtanxjpw49ehvga5qjlstn8c826qe' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra178jydtjvj4gw8earkgnqc80c3hrmqj4kw2welz' as ContractAddr,
        lp: 'terra1rqkyau9hanxtn63mjrdfhpnkpddztv3qav0tq2' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.SPEC],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1tn8ejzw8kpuc87nu42f6qeyen4c7qy35tl8t20' as ContractAddr,
        lp: 'terra1y9kxxm97vu4ex3uy0rgdr5h2vt7aze5sqx7jyl' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.VKR],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra15s2wgdeqhuc4gfg7sfjyaep5cch38mwtzmwqrx' as ContractAddr,
        lp: 'terra1lw36qqz72mxajrfgkv24lahudq3ehmkpc305yc' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1e59utusv5rspqsu8t37h5w887d9rdykljedxw0' as ContractAddr,
        lp: 'terra17fysmcl52xjrs8ldswhz7n6mt37r9cmpcguack' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.PSI],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1v5ct2tuhfqd0tf8z0wwengh4fg77kaczgf6gtx' as ContractAddr,
        lp: 'terra1cspx9menzglmn7xt3tcn8v8lg6gu9r50d7lnve' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra163pkeeuwxzr0yhndf8xd2jprm9hrtk59xf7nqf' as ContractAddr,
        lp: 'terra1q6r8hfdl203htfvpsmyh8x689lp2g0m7856fwd' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.KUJI],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1zkyrfyq7x9v5vqnnrznn3kvj35az4f6jxftrl2' as ContractAddr,
        lp: 'terra1cmqv3sjew8kcm3j907x2026e4n0ejl2jackxlx' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.ALTE],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra18adm0emn6j3pnc90ldechhun62y898xrdmfgfz' as ContractAddr,
        lp: 'terra1x3musrr03tl3dy9xhagm6r5nthwwxgx0hezc79' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.Luna,
        pair: 'terra1kh2g4fnhvqtnwwpqa84eywn72ve9vdkp5chhlx' as ContractAddr,
        lp: 'terra1c5khguw3ensqawepuxh7vdzfpxa9ulwauhm0r5' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.ASTRO],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1l7xu2rl3c7qmtx3r5sd2tz25glf6jh8ul7aag7' as ContractAddr,
        lp: 'terra17n5sunn88hpy965mzvt3079fqx3rttnplg779g' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.WHALE],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1v4kpj65uq63m4x0mqzntzm27ecpactt42nyp5c' as ContractAddr,
        lp: 'terra17pqpurglgfqnvkhypask28c3llnf69cstaquke' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.APOLLO],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1zpnhtf9h5s7ze2ewlqyer83sr4043qcq64zfc4' as ContractAddr,
        lp: 'terra1zuktmswe9zjck0xdpw2k79t0crjk86fljv2rm0' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1xj2w7w8mx6m2nueczgsxy2gnmujwejjeu2xf78' as ContractAddr,
        lp: 'terra1n3gt4k3vth0uppk0urche6m3geu9eqcyujt88q' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.LUNI],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1vayuttjw6z4hk5r734z9qatgs8vp6r5a2t043p' as ContractAddr,
        lp: 'terra1p4pfnpsv8ly4mgzsmegz52kgjq8gp64almryky' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.TLAND],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1jzqlw8mfau9ewr7lufqkrpgfzk4legz9zx306p' as ContractAddr,
        lp: 'terra1znt9ness8ayxvpmldqser8ess07engetmrxwfd' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.ORNE],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra13yftwgefkggq3u627gphq98s6ufwh9u85h5kmg' as ContractAddr,
        lp: 'terra16zy9g2eym8rghxx95ny60c3dyrwqsfx0ypmu5y' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.PLY],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra19fjaurx28dq4wgnf9fv3qg0lwldcln3jqafzm6' as ContractAddr,
        lp: 'terra1h69kvcmg8jnq7ph2r45k6md4afkl96ugg73amc' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.XTRA],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1uvchkwq4kv0vhy23c78hyy72zks2hqtpctklh2' as ContractAddr,
        lp: 'terra1pndz6cy4t42qae4m7avkjjyu6vlcrlrx3hep0k' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.aUST],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1z50zu7j39s2dls8k9xqyxc89305up0w7f7ec3n' as ContractAddr,
        lp: 'terra1umup8qvslkayek0af8u7x2r3r5ndhk2fwhdxz5' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.GLOW],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1p44kn7l233p7gcj0v3mzury8k7cwf4zt6gsxs5' as ContractAddr,
        lp: 'terra1khm4az2cjlzl76885x2n7re48l9ygckjuye0mt' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.ATLO],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1ycp5lnn0qu4sq4wq7k63zax9f05852xt9nu3yc' as ContractAddr,
        lp: 'terra1l0wqwge0vtfmukx028pluxsr7ee2vk8gl5mlxr' as ContractAddr,
      },
    ],
  },
]

const testnetTokenList: TokenType[] = [
  {
    ...tokenInfo[TokenKeyEnum.MIAW],
    contractOrDenom:
      'terra1qu5fractk8lgq23gh8efvlywal6rsd9ds8r73l' as ContractAddr,
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1834ku9y7s2swyp2r090pc29c4s06hy9n9drwvy' as ContractAddr,
        lp: 'terra18e4mudt7kdml6lma5fhsydszxpexmxf2ez9hpn' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.MIR],
    contractOrDenom:
      'terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u' as ContractAddr,
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1cz6qp8lfwht83fh9xm9n94kj04qc35ulga5dl0' as ContractAddr,
        lp: 'terra1zrryfhlrpg49quz37u90ck6f396l4xdjs5s08j' as ContractAddr,
      },
    ],
  },
]

const mainnetLpOfLpList: LpofLpType[] = [
  {
    token_0_LogoList: [LUNALogo, bLUNALogo],
    token_0_Contract:
      'terra1nuy34nwnsh53ygpc4xprlj263cztw7vc99leh2' as ContractAddr,
    token_0_Symbol: 'Luna-bLuna Lp Of Terraswap',
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
    token_1_Symbol: 'Luna-UST Lp Of Terraswap',
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

const mainnetLimitOrder =
  'terra18ntqa5t2nfmqadpn9skrvk373dsk7kdv4gdwf3' as ContractAddr
const testnetLimitOrder =
  'terra1a487xe70k8d7vpprm3mlqmql3fxyw9qa5jcpez' as ContractAddr

export default {
  mainnetTokenList,
  testnetTokenList,
  mainnetLpOfLpList,
  mainnetLpStakingList,
  testnetLpStakingList,
  address,
  mainnetLimitOrder,
  testnetLimitOrder,
  tokenInfo,
}
