export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';

export interface Teenieping {
  name: string;
  image: string;
}

export interface PrincessQuestion {
  princess: string;
  image: string;
  answer: string;
  aliases: string[];
}

// 쉬움: 가장 유명한 로열 티니핑 5마리
export const easyTeeniepings: Teenieping[] = [
  {
    name: "하츄핑",
    image: "/images/teenieping/qCAQth-ngjja14PVwr4s-ry1pTN27Vy6_QUweUrtvB98LWln2P6r-4gK6z0DXHS9DNb2QPP-LhqpGNS-1rYm4jhWB-lItmnQgfH16bv3-t0DYqaVR3UqYMoG4LcKvOwCmtujXY7eOTsGdNg8F7GCaA.webp",
  },
  {
    name: "바로핑",
    image: "/images/teenieping/D04WOLfMuZU0SbkGzsuSE4Ii6dKmZipoA3VZNvLc2uTXZbpfv3t4RSGtjfGK4ygtWcbWnnieCJYAJbZyksLxWUbd3tIPOGYdT-7xsHTpjOkDQ7Y5zcikw96JCsRekFzAnrXEjh75qxSgKYrwY0p10g.webp",
  },
  {
    name: "아자핑",
    image: "/images/teenieping/KAeYGe-Bnx0QhY0SXIJjMcnaXgTt4oRdETRbNAHs8l5B-OzUfBAd8s5jsq9TLjfYgef8-07em1w8Byq2vstiM0xV8FmbTh9jKnuvW44SF2VAd2y16MoLzdfp30rFIZpzVcOKClBhlASZd88VeiEgzw.webp",
  },
  {
    name: "라라핑",
    image: "/images/teenieping/AqYfWf6x5Edk1mCrPqNEByL7VKfvxkIqY9zJj7qrsoiQAGpW3av4P5IvjBlMrxcZloxVpJ2iI_m3X9DWdQ4xHdZd25307eTHL1MixT2WAXr8ljbKZl8hCq5BIjKJ8bBVpQHtneuLmctYFZxQtb_Csw.webp",
  },
  {
    name: "해핑",
    image: "/images/teenieping/KzWdBt5q4STT9FKcGroK7nFwCKoW7WWde9BjdZO2biiVgK8_-dzVxJeqygR6dx3H77hY9LkHeGYNFCbNFVe6gcfmnidzZAEln_u8SuYb7C0ykdMTDZojS5-kQGWTUWQn1G8OOt4wIHJhN_mIIdN-wg.webp",
  },
];

// 중간: 쉬움 + 추가 로열 티니핑 (총 10스테이지)
export const mediumTeeniepings: Teenieping[] = [
  ...easyTeeniepings,
  {
    name: "조아핑",
    image: "/images/teenieping/BpmC1ZXtlCQ1YpbpTu3Sa3lrVzAwHa1wdwkHww4tTl_88sEVOTEjcpqbrhfWv0r-rHId_552fub3rWZFlmHqb0WgGE42vTCHYhrnJGJtwYvRLM_VSN-1RacBNWMhEMHckUhfhJPmms82EUDUFrhhkw.webp",
  },
  {
    name: "믿어핑",
    image: "/images/teenieping/GDqR1_gsdiL9pvqZbS0fx4jyNKoxZYbApSTmlOHjqNrnYZY0WLEofE-6BotnRk4E7uxv30qE6hUWu5VpC3H25f4ELqISEBdro7ZXV57Wghl2p2CCU5Gt4UeSpeWpC0Fnv-QluXkZCv9ciqORjchpjw.webp",
  },
  {
    name: "나나핑",
    image: "/images/teenieping/D7SnxlIUdQmoAcQ7OPpYuf1rkQctwgA2qgB62sWCqrV_py2p9yY_pyd_9zp5DLuTbEBV6cCCfPe1velzH2c3eLszCdSrg4osVtuNTRMLqL3op_xju5Erwd6XUcsQC3wM4qB_jzmYRPXpO3ZZ6Rmcrw.webp",
  },
  {
    name: "포실핑",
    image: "/images/teenieping/eTaDF3MHi7IeZ8VBavEGBNIB6xKk4vfxqABq1da81JAtsCpbMgS7OqKsBQrf6NeIC1u3EPdK0aAZkEvGYdKrzlkV07Ei1s0t5cne0rESTPkYz_ELAH8bFYSvEi_aHStjt1K95nYYk9AedbgB4rg2oA.webp",
  },
  {
    name: "빛나핑",
    image: "/images/teenieping/_0mI_UE6ne79OSmV116q-i4eLV7OBHcRj3LBHwyoJ7Zz4VXD-yYle5M5jLFq4aB2_Dr0RtAT4MUu-bYjkaoyQQnR8Ktqb7DIVh60VD7BXrr0gRszWVNaF-cfwNit7sKmT-6jBVZB-JZqeJEOxS3OuA.webp",
  },
];

// 어려움: 일반 티니핑 15마리 (쉬움/중간 제외)
export const hardTeeniepings: Teenieping[] = [
  {
    name: "베베핑",
    image: "/images/teenieping/PwSw8EcnpejaMuaQ9-v0LVfg2IeAdN0wddCVuufi8WvU58-nRsZc9cG8DqRiXlX21OB4jhfr2tFKJ9TxaDCUof0KphRZE6nT9fcLqyBgUA0Am3sbHoKg11DBULcUFhRCS4Bi3n0Zh0Kp_1ErtbxvXg.webp",
  },
  {
    name: "앙대핑",
    image: "/images/teenieping/O9dP_Sj7tY3UhzwGyWZMEgbGpiJo5yQkMlh-7IomuFq4Ve2_O04udnmmXDnj5XJSOLKOb2J0RpXuLuXRsRS0DmElox21SmPa-SO0M2SLRbcDvwxI8RDLvMUGYfVGfrSL8GYySPbxeINr-uOjqxcHEQ.webp",
  },
  {
    name: "차캐핑",
    image: "/images/teenieping/jxZjmqvR0B__64pQ-DooIF5YtYvPhivZsKNqxTL24YLO5nQFn2wukUc_WmOTGPOAJBeaYzDhWuigE6DBciM9ooFmIsDkdofBl6D9g7AdOaj0C9G--9UX7Pumvq5By8EPR9vNrRHrPG8zOGzM82KAeg.webp",
  },
  {
    name: "아잉핑",
    image: "/images/teenieping/0C0EDxd19s9OAh5WAwfLhLl24Lr17kVwEjNaLM18Vst2_udSyT8JLA0IFESilcGvGnXtMJVRrbSOUwjROiRf_ksM5YpWkjQ1mSB1zMsW8tz91sHsjwaB-ivyplPymPTKycDowrDSs0vOsYS_18Tsvw.webp",
  },
  {
    name: "싹싹핑",
    image: "/images/teenieping/6JC0iXOt1pwxI3o-lUI3MnzC288i2CxlDfnvh4t-p9cRkx9JYKAXjUrv49mT6EnutMd7ue3s_sUVAJcgeuxOMicl4ypH6-2jR9BoUOG8XtTy7jnBnV5YNqWarMMfTcA7ZoM5lM-_X0I0T6t2YACIhA.webp",
  },
  {
    name: "토닥핑",
    image: "/images/teenieping/UxE776zsI9toDcMx-Jq4IjTh_Zr_jD5k-IopFVyX0sGoM3hpvWpJ8XbuTebT8IFZwGXx7W5jGkGx1S-s5tsqV2ooCn6AWlf5F_8J30w6KXIpX6jEZhP39JIZX9xGhDd7GPciR0wHFCHsEkotP2CefQ.webp",
  },
  {
    name: "포근핑",
    image: "/images/teenieping/CDoSqy2ynz8tbHjZq3S-88dwIAjYUOcLX7AZlzTOQPZalHvcrYbVJc_U-XR96qJOqT5RHuoQSQUYAnOISLTRGbb2FzhAw8ZOpj6-qIrNe-N1i1gdnj-bwWJTl8-qq6eMCUZye5zJLvv3QSvxlhuqDw.webp",
  },
  {
    name: "뚝딱핑",
    image: "/images/teenieping/dbDv23lyQdew9qEfDaWIPW1DLdw8eu6lhlkKbxgySnHyhgoOICBKcNtaOKU40FXjfaAPpuZvCstJLwHD3nJQ7hUEDcjeRp0Ra0tonfaheNubCirliQ0woa43Zsjm2jSbN435x7WIsHrZfTLmoePlzA.webp",
  },
  {
    name: "메모핑",
    image: "/images/teenieping/ysFfNG8jmaiSd2DE-3fC_moMv4TvnKE5pKxYvdLZ42qosAEeDKkZbsTXW_h0nxfxDXRTKjFoZscBqy2SCF-l-WPT4P34KxW_1GbHSvHU8Eimxdc0ww2mC-OO41udXP3j0gVWJ29t5cFn_iKWEK1lQA.webp",
  },
  {
    name: "삐뽀핑",
    image: "/images/teenieping/nRZIPePyjri59g560474XQFPE7MR_zKKWHAN9aKswYvg2YFc0j-d9AfYnTJWj7Vlq4iXwuxdtZ8-etuEE9WBM1aoaH5HC78sCh19DkIvog63I_ITJNZDE994fwvjaJqwgHnZvgoH-iJ1rQyLUdJpSw.webp",
  },
  {
    name: "퐁당핑",
    image: "/images/teenieping/N4_Qwj4n9DhQxG2ClT43aq3UgrH_Qx36Uc8SDZbRAWllWaKLsKCE1JUlwJPdH0hDXJEne0ZMsEAD8Cu56wLn-4hJGNLD6CO5lM2RS6q5ejBZZr0wgVDWH57pIOEXEoc_43FpBrwo8tODKUk8Q4gllA.webp",
  },
  {
    name: "파티핑",
    image: "/images/teenieping/mtXAD7KiHtF7Kw9tVrHf-6zxboOLUcF6qFjJ54pzlMUqTIS088dxzmQyUnB6MUGhlTa6Pvmy7pA6JffngDr7E1MKUWIMekAu5moN6EuDAT2DwRRjcfzvXGPQcjjHtHcYWvx_gYfmADHX0km57_SQAg.webp",
  },
  {
    name: "빨리핑",
    image: "/images/teenieping/pMw_nQpZx1ZYg8qsS2w2S2iGRc0XsUwApStt1zv6Gwln005afUI4L8MCHtItvL7FTcIwdezeGqfHH781HgQhMwLxYl9hlUhD1368vAm9Ht4ISbvmrzK-Rbzet0fItxGn3ecIWQAz0NE25AO4Q8RMDA.webp",
  },
  {
    name: "힘내핑",
    image: "/images/teenieping/uVwf8cIUlZbTXa2AYkAnbZMtk6w6mOba-bW5dzhlIPRIzOQudYlMUioD18ImjT26_6aP5wg69wIDFzg7QtjIXvyUxlhvEoCtN8FuwTcqka3dArt2-wS3_KXWoQSTMrfFTs0qF-roDG6FzU2MY2eklg.webp",
  },
  {
    name: "키키핑",
    image: "/images/teenieping/s2aO3IGHFbZlLcoecXu7JPclt6KR32SADm-yhnWsC8RVYcb9BI8PAeYj4WWBQtYJkrMpP2Cgxnfb3ea__CbwcTbYUIiL3kzBVfCAxCufY-1JhRaRITVdyFbA-q1RtOMUpl7BN8aZMe57VLUZJRMBMQ.webp",
  },
];

// 극악: 로미 프린세스 (합체한 티니핑 맞추기)
export const extremeQuestions: PrincessQuestion[] = [
  {
    princess: "프린세스 하트",
    image: "/images/princess/3TFx9OPSxVp2Yn3dSFwm_8Lefwtz9eQs_xcXyyhxyfTHNfCfuf39yAlWoXp1bFhSYGR1WQOaRg8on5AswylKBzsvCP0fq5E6Ut9CGRyDTZzokP-9D5g_MbtO_DvflQODLDPEeHoG4YLOTdy7e-AROw.webp",
    answer: "하츄핑",
    aliases: ["키키핑", "아잉핑"],
  },
  {
    princess: "프린세스 클라우디아",
    image: "/images/princess/-kmfrVMEXJWul8KgZK2vnbxkiwsvTTGw40Ll4PpDF75eWjMpFL44ZN7qqufzVnpU0v1O0nRScZ5dGmkBzLD4GIT53IEy7GazKM7A6VLsqtGcgqfo1h5Dmg0iXMDXgBYbdGjBG7Pqlvr1QXfev-dLkg.webp",
    answer: "바로핑",
    aliases: ["부투핑", "깜빡핑"],
  },
  {
    princess: "프린세스 클로버",
    image: "/images/princess/LrnbMNJnTkRiRhGRyjmXwi18DG4EWx23oX_vz6Ng1w-xdotTeFHpnLcNAihMU-WciZcPiG00dmA021yjnk18rZGfYpdQQoyTVEAB6WE77vO41E99m6V-z5CYzLju1iDY-5TKACaDmpdLbtmDcrgUGg.webp",
    answer: "차차핑",
    aliases: ["주르핑", "떠벌핑"],
  },
  {
    princess: "프린세스 스타",
    image: "/images/princess/HuxLsTtEbJ0d3D8mJNP08WYYmBGQ0fkqVdt3H9JD8tU36Kw9iQGsAB5yj7gnPUI4Q-j253fzR6NEYuihz-ONyBBJFEf_zXA3MIzW36YquJ6nR0G0sjuXXmcah6qrfX_LyyxM8WUynw8Ut81oEOKDvA.webp",
    answer: "아자핑",
    aliases: ["차나핑", "무셔핑"],
  },
  {
    princess: "프린세스 멜로디",
    image: "/images/princess/gKiDmoX5BIYsItsTPdZ2wzqyDmgmtDEyEUyeb79ksQtXx3-meSTJ2DNsZJWScTIvODpdPeY4pWJoe44wYdoQrgMA7UZBReB_QOrmLqfl6VZNeYLh-shrFnCTU3o3McXyIjP7vxdWeQjJefvvqbazDQ.webp",
    answer: "라라핑",
    aliases: ["따라핑", "바네핑"],
  },
  {
    princess: "프린세스 선샤인",
    image: "/images/princess/qMgc0sIOgctoE_bMjseXHcoypmJePl75WFQcib7nVpNbs9hbqaLMspRwb4giwNIgECNjKkLpkQDPfFWj7oBOnzMTwgjlgCmK8m4tnZKZv_r75mZ7QHCZLY8otlsRGxTewVzKa53hqKI8CjsWUEv3dQ.webp",
    answer: "해핑",
    aliases: ["아휴핑", "꽁꽁핑"],
  },
  {
    princess: "프린세스 베로니카",
    image: "/images/princess/JdXq1q07czfNN5QmestlJfQ4PsyDNjbD34RZUbZm96FjFwz5QwQH0bobjC7nXSUv2GfYxGqoJND4xMTecqFosA02eN5z_5aKLUYJRAdv-Jd-xMAB-2kQVmYQy-xH6NeEPwhAFaK5OgMSxLMmrdgZDw.webp",
    answer: "앙대핑",
    aliases: [],
  },
  {
    princess: "프린세스 다이아하트",
    image: "/images/princess/CXeABViI56_AKFJhm5uD4Vjq6gGkUr3tQUfH6RBAn1G09AbC4qxdZHz8b8fHlmAd5JFXR8mhmWQ21TbkeE88qOciqT7hjoln_npsU0-T0FNC3sZ-ITQ8Dj1WA-jvCegetUEpcgrzJ-gi4k6-lRKonw.webp",
    answer: "소원핑",
    aliases: ["싹싹핑", "공쥬핑"],
  },
  {
    princess: "프린세스 루비",
    image: "/images/princess/mniiQeAHbwQFLmPou0gnNhzLVTMoSZ-RIPqVk3WSVy9gP7lVB8ZLLqV_JN3hsxA4-Vbx32SNqI_yKz5EquWZ-rEUb-zmy-NV-IL2QE5dN0ipjz2TUhetK9a6O0u1K0MdcB1zzZ3iIo7qNLOv3HOb0A.webp",
    answer: "방글핑",
    aliases: ["까르핑", "맛나핑"],
  },
  {
    princess: "프린세스 사파이어",
    image: "/images/princess/Sm-8HmxZPUD7wfcHmdAeWWgxeENr34F3l1Hs85ZTtQXrA_qYQHqwY3YFq16lt9cZi2f2TesIOgv42gLD5brGbs7zCEdrzZyx6tIwr90xmmolf1P4-j_9lt5S_JFUayKHPdW255WYVQbDPtaJC9NIMA.webp",
    answer: "믿어핑",
    aliases: ["아야핑", "토닥핑"],
  },
  {
    princess: "프린세스 에메랄드",
    image: "/images/princess/LKb4OGb7qAWGt55bxlcNz-3XQAFsHFBQc7E5F1B3krINU8RoNv2wDd4IUC-_rju2fvgBQnWi_ahc3RmTuk7BWhRMtDq6fGLhXC7La3yq5-2PrQYGOFKjeeAgjNe7f6HPtBYXl0luC48-wAa0O34OPA.webp",
    answer: "조아핑",
    aliases: ["쪼꼼핑", "메모핑"],
  },
  {
    princess: "프린세스 플로라하트",
    image: "/images/princess/11pHDbQb5fLc1P2gC3eimXMMHo67qxJCO0C4oKU9i3Tl3MaqghPnpn07BGxzOd90GnOrzoBfnX0AlEOdd811QRtpusiHkIuIIVPc7awu0CGprzUMYkWjp1bRxTE5v2YSQIaaY5xz3ebgIC0Sdr49xw.webp",
    answer: "빨리핑",
    aliases: ["고쳐핑", "아라핑"],
  },
  {
    princess: "프린세스 솔라리스",
    image: "/images/princess/c4IZlQfaGU-3OSpf0PrsibXzwI2ZIeNEOq1EBYHZvLxI6QpmO7vOg7txYUVFFJ1536aKflG6pw_8_htaS_6Bkczb0nnIQLUrBRD1Lgi88bDbB4l9jBMCz5WK7gdRUM9ofrXOSvR67xFhW6g2ju8D6A.webp",
    answer: "나나핑",
    aliases: ["얌얌핑", "패션핑"],
  },
  {
    princess: "프린세스 글로리아",
    image: "/images/princess/JZvBaR0hraAd51qSBPLytcRzsVLYYn1dWZb89CEnlNv06Y0VHxVaaRgcK7FJ2m5zK0udDz7wZelO4k_SBFqoXppeIoGNRw-riWtnVfXQlSqk0w8ZmKzE5eLc80xyhcmevIvRMU5APiAtVqKXt3mDGg.webp",
    answer: "솔찌핑",
    aliases: ["뜨거핑", "힘내핑"],
  },
  {
    princess: "프린세스 크리스탈",
    image: "/images/princess/7f4KnIqKghxhzN1fvl0Lx5JKiNo6Lc0qMnmecfKJMraKds67pcUnWwnPxrSMFwPnflBt1vjQ2csHn4n23WNKT6BHU2ERi1_y-HfqQauLioTsq6xuKqBRcWF47lL6-yWdPoakdTNFTaJ1V7KKoUWkJA.webp",
    answer: "꾸래핑",
    aliases: ["삐뽀핑", "꼼딱핑"],
  },
];

export const STAGE_COUNTS: Record<Difficulty, number> = {
  easy: 5,
  medium: 10,
  hard: 15,
  extreme: 15,
};

export function getQuestionsForDifficulty(difficulty: Difficulty) {
  const questions = {
    easy: easyTeeniepings,
    medium: mediumTeeniepings,
    hard: hardTeeniepings,
    extreme: extremeQuestions,
  };
  return questions[difficulty];
}
