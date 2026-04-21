export type ActionData = {
  id: string;
  label: string;
  popup: string;
};

export type ActData = {
  id: number;
  time: string;
  title: string;
  description: string[];
  actions: ActionData[];
  imagePrompt: string;
};

export const storyData: ActData[] = [
  {
    id: 1,
    time: "寅时",
    title: "清晨备船 | 船长的第一件事",
    description: [
      "天刚蒙蒙亮，汴河晨雾未散。",
      "你作为一船之长，必须先检查船只是否安全，再清点货物、查看水情。",
      "桅杆是否牢固？橹桨是否完好？缆绳、船锚是否可用？",
      "货物有无受潮、丢失？风向、水流是否适合出航？",
      "一一确认无误，才能鸣笛起航。"
    ],
    actions: [
      { id: "1-1", label: "检查桅杆", popup: "汴河船为浅底平底船，适合内河浅水航行。" },
      { id: "1-2", label: "检查橹桨", popup: "船长在宋代称为纲首/梢公，是一船的最高负责人。" },
      { id: "1-3", label: "检查缆绳锚石", popup: "开船前必须查看水情、风向，这是千年行船规矩。" },
      { id: "1-4", label: "清点货物", popup: "汴河是北宋京城的生命线，你的船满载江南物资。" },
      { id: "1-5", label: "确认出航", popup: "一切准备就绪，准备鸣笛起航！" },
    ],
    imagePrompt: "A delicate ink wash sketch of a Song Dynasty boat moored at dawn. Minimalist style, brush strokes visible, soft mist, a single glowing lantern. Sketchbook aesthetic on rice paper background."
  },
  {
    id: 2,
    time: "卯时",
    title: "汴河航行 | 掌舵行船，避让有序",
    description: [
      "船入主航道，水流平稳，两岸市井渐次热闹。",
      "你站在船尾掌舵，指挥船工摇橹、撑篙。",
      "遇小船要避让，遇官船要礼让，靠右行驶，不乱航道。",
      "汴河之上，船来船往，全靠船长经验与规矩通行。"
    ],
    actions: [
      { id: "2-1", label: "向左掌舵", popup: "汴河行船靠右行驶，民船礼让官船、货船礼让渡船。" },
      { id: "2-2", label: "向右掌舵", popup: "宋代内河船无机械动力，全靠橹、篙、帆、拉纤行驶。" },
      { id: "2-3", label: "摇橹前进", popup: "船长必须时刻瞭望，判断水流、船只、桥洞情况。" },
      { id: "2-4", label: "避让船只", popup: "水流平稳，但商船众多，需小心避让。" },
      { id: "2-5", label: "暂停瞭望", popup: "稍作休息，观察前方的虹桥。" },
    ],
    imagePrompt: "Hand-drawn ink illustration of river waves and a sculling oar (lu). Dynamic brushwork showing water movement. Ancient Chinese sketch style, monochrome with slight ochre tint."
  },
  {
    id: 3,
    time: "辰时",
    title: "虹桥险关 | 全船最紧张的时刻",
    description: [
      "前方就是汴京最热闹的虹桥！",
      "桥洞低矮，大船无法直接通过。",
      "你立刻大喊指挥：快降桅杆！收帆！撑篙稳船！",
      "桅杆不降，船毁货损，还会触犯码头规矩！",
      "全船屏息，动作必须快、准、稳！"
    ],
    actions: [
      { id: "3-1", label: "大喊：降桅！", popup: "虹桥为无脚拱桥，桥洞低矮，大船必须降桅才能通过。" },
      { id: "3-2", label: "降下桅杆", popup: "这是《清明上河图》最经典、最动态的历史细节。" },
      { id: "3-3", label: "撑篙稳船", popup: "过桥违规者会被码头处罚，甚至扣船。" },
      { id: "3-4", label: "平稳通过虹桥", popup: "全船屏息，动作必须快、准、稳！" },
      { id: "3-5", label: "升起桅杆", popup: "化险为夷，重新升起桅杆前行。" },
    ],
    imagePrompt: "A dramatic ink painting of the Rainbow Bridge arch from a captain's POV. The mast is tilted, ropes are taut. Artistic, focused on the wooden structure. Traditional Chinese drawing."
  },
  {
    id: 4,
    time: "巳时",
    title: "码头停靠 | 按区停泊，遵守规则",
    description: [
      "顺利通过虹桥，抵达指定货船码头。",
      "码头分区明确：官船、货船、客船、渡船各停其位。",
      "你需要选对停靠区域，抛锚固定，再将多条缆绳牢牢系在岸边石桩上。",
      "停错位置会被码头行老（管事）驱赶，影响卸货。"
    ],
    actions: [
      { id: "4-1", label: "选择停靠区：货船码头", popup: "宋代码头严格分船停靠，不允许乱停占道。" },
      { id: "4-2", label: "抛石锚固定", popup: "大船必须多缆系固，防止水流冲移。" },
      { id: "4-3", label: "系紧前缆", popup: "水流湍急，前缆必须系牢在石桩上。" },
      { id: "4-4", label: "系紧后缆", popup: "码头行老：负责码头秩序、搬运安排、收费管理。" },
      { id: "4-5", label: "停靠完成", popup: "平稳停靠，准备开始卸货。" },
    ],
    imagePrompt: "A hand-drawn ink sketch of wooden docks and thick mooring ropes tied to stone pillars. Song dynasty style, traditional Chinese drawing, monochrome with sepia tone."
  },
  {
    id: 5,
    time: "午时",
    title: "卸货验货 | 汴河物流，一丝不苟",
    description: [
      "船停稳，码头搬运工（脚夫）上船卸货。",
      "你亲自监督，按货单清点：",
      "江南大米、绸缎布匹、新茶、鲜果……",
      "一件不少、一件不损、一件不换。",
      "清点无误，签字画押，才算完成运输这一关。"
    ],
    actions: [
      { id: "5-1", label: "打开船舱", popup: "宋代码头卸货由行老统一安排，按竹签计件算工钱。" },
      { id: "5-2", label: "指挥卸货", popup: "货物丢失、受潮、损坏，由船长负责赔偿。" },
      { id: "5-3", label: "清点货物数量", popup: "汴河货运是北宋京城最重要的物资补给线。" },
      { id: "5-4", label: "核对货单", popup: "江南大米、绸缎布匹、新茶、鲜果……一一核对。" },
      { id: "5-5", label: "确认验货完成", popup: "清点无误，签字画押，完成运输查验。" },
    ],
    imagePrompt: "A series of small ink sketches showing sacks of rice and bamboo tally sticks. Detailed brushwork, \"field notes\" style of a Song Dynasty merchant."
  },
  {
    id: 6,
    time: "未时",
    title: "商铺结算 | 水上供全城，一船联百铺",
    description: [
      "你的船，就是岸上商铺的“水上仓库”。",
      "不同货物，送往不同商铺：",
      "大米 → 米行粮铺",
      "绸缎 → 绸缎庄",
      "茶叶、鲜果 → 香饮子铺、酒楼",
      "杂货 → 杂货铺",
      "送货上门，对账收钱，完成一趟船的生意。"
    ],
    actions: [
      { id: "6-1", label: "送米至粮铺", popup: "汴河船与岸上商铺深度共生，船运即城市供应链。" },
      { id: "6-2", label: "送绸缎至绸缎庄", popup: "香饮子铺、酒楼、杂货铺、鲜花摊……全都依赖水运供货。" },
      { id: "6-3", label: "送茶果至香饮子铺", popup: "船长与商家长期合作，形成稳定的市井商业链。" },
      { id: "6-4", label: "送杂货至杂货铺", popup: "各类杂货是城中百姓日常生活所需。" },
      { id: "6-5", label: "画押收钱", popup: "送货上门，对账收钱，完成一趟船的生意。" },
    ],
    imagePrompt: "An ancient Chinese ledger book open on a wooden table, ink and brush next to it, Song Dynasty style, faint calligraphy writing, sepia tone, hand-drawn sketch."
  },
  {
    id: 7,
    time: "酉时",
    title: "收船歇夜 | 以船为家，日夜守护",
    description: [
      "夕阳西下，汴河染金。",
      "一天的航行、卸货、结算结束。",
      "你加固缆绳、检查船舱、防火防盗、看护剩余货物。",
      "船，就是你的家。妻子做饭，孩子嬉闹，船家的日子，简单又踏实。",
      "等明日天亮，再次起航。"
    ],
    actions: [
      { id: "7-1", label: "加固缆绳", popup: "宋代船工、船长大多全家居住在船上，以船为家。" },
      { id: "7-2", label: "夜间巡船", popup: "夜间必须留人守船，防水、防火、防盗、防破坏。" },
      { id: "7-3", label: "防火防盗检查", popup: "汴河船家，是北宋最典型、最庞大的市井群体之一。" },
      { id: "7-4", label: "船上晚餐", popup: "妻子做饭，孩子嬉闹，享受片刻宁静。" },
      { id: "7-5", label: "合卷歇息", popup: "一天的劳作结束，伴着汴河水声入眠。" },
    ],
    imagePrompt: "A delicate ink wash sketch of a cabin interior on a Song Dynasty wooden boat at sunset. A small table, a lit candle, and a window looking out to the river. Traditional Chinese drawing style, minimalist brushwork, monochrome with warm sepia and ochre tints, sketchbook aesthetic on rice paper background."
  }
];
