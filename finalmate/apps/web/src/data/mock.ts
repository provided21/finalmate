import type { Course, PaperDistribution } from '../types';

export const mockCourse: Course = {
  id: 'system-analysis-final',
  title: '系统分析与设计期末冲刺',
  semester: '2025-2026 春季学期',
  examDate: '2026-06-20',
  teacher: '课程教师',
  units: [
    {
      id: 'erd',
      title: 'ERD 与系统实体建模',
      chapter: '系统分析与设计',
      examWeight: 92,
      mastery: 72,
      status: 'learning',
      type: '概念 + 作图 + 案例题',
      tags: ['高频', '大题', '易混淆'],
      summary: 'ERD 用实体、属性、联系表达系统中的数据结构，是从需求分析过渡到数据库设计的重要工具。',
      why: '期末考试常要求根据场景描述识别实体、属性、联系，并画出完整 ER 图。它考察的不是背定义，而是能否把现实业务抽象成数据模型。',
      humanExplain: '可以把 ERD 理解成一张“业务世界的关系地图”。比如学生选课系统里，学生、课程、教师都是现实中的对象，它们在系统中就可能被抽象成实体；学生选择课程、教师教授课程，这些动作就会变成联系。',
      example: '例如“学生根据课程安排选课”这句话中，学生和课程是实体，“选课”是学生与课程之间的联系；如果系统要记录选课时间和成绩，那么选课时间、成绩就可以作为“选课”这个联系的属性。',
      mistakes: ['把动作直接当成实体，而没有判断它是否需要独立保存数据。', '漏掉联系上的属性，例如选课时间、成绩、状态。', '没有区分一对一、一对多、多对多联系。'],
      memoryMethods: [
        { name: '三问识别法', content: '问“谁参与？”找实体；问“发生了什么关系？”找联系；问“要记录什么信息？”找属性。', appliesTo: ['concept', 'case'] },
        { name: '句子拆解法', content: '名词多半是实体或属性，动词多半是联系，数量词和约束条件对应基数。', appliesTo: ['case'] }
      ],
      quiz: [
        { id: 'q-erd-1', type: '简答题', question: '学生选课系统中，为什么“选课”通常适合作为学生与课程之间的联系？', answer: '因为选课表达的是学生和课程之间发生的业务关系，且可以附带选课时间、成绩、选课状态等联系属性。', keywords: ['学生', '课程', '业务关系', '选课时间', '成绩', '联系属性'], difficulty: 'medium' },
        { id: 'q-erd-2', type: '案例题', question: '请从“教师开设课程，学生选择课程，系统记录成绩”中识别主要实体和联系。', answer: '实体包括教师、课程、学生；联系包括教师开设课程、学生选择课程；成绩可作为选课联系的属性。', keywords: ['教师', '课程', '学生', '开设', '选择', '成绩'], difficulty: 'medium' }
      ]
    },
    {
      id: 'events',
      title: '事件列表与六维描述',
      chapter: '需求分析',
      examWeight: 88,
      mastery: 54,
      status: 'todo',
      type: '表格题 + 场景分析',
      tags: ['高频', '模板题'],
      summary: '事件列表用于描述系统对外部事件的响应，常用六维包括事件、触发者、触发条件、输入、处理、输出。',
      why: '期末常给出业务场景，要求列出完整事件列表。能否列全，取决于是否理解系统边界和外部参与者。',
      humanExplain: '可以把事件列表理解成系统的“待办反应表”：外部有人做了一件事，系统应该收到什么信息、做什么处理、产生什么结果。',
      example: '在银行存款场景中，客户发起存款请求是事件，客户是触发者，输入包括账号和金额，系统处理包括验证账户、更新余额、生成交易记录，输出包括存款成功提示和凭条。',
      mistakes: ['把系统内部步骤误写成外部事件。', '事件粒度过细，导致列表变成程序步骤。', '只写功能名称，不写输入、处理和输出。'],
      memoryMethods: [
        { name: '外部触发口诀', content: '外人一动作，系统一响应；有输入、有处理、有结果。', appliesTo: ['process', 'case'] },
        { name: '六格模板法', content: '事件、触发者、触发条件、输入、处理、输出，做题时先画六列表。', appliesTo: ['concept', 'process'] }
      ],
      quiz: [
        { id: 'q-events-1', type: '填空题', question: '事件列表六维通常包括事件、触发者、触发条件、输入、处理和____。', answer: '输出。', keywords: ['输出'], difficulty: 'easy' },
        { id: 'q-events-2', type: '简答题', question: '为什么不能把系统内部的“更新数据库”单独列为外部事件？', answer: '因为事件列表描述的是系统对外部触发的响应，更新数据库属于系统内部处理步骤，不是外部参与者触发的独立业务事件。', keywords: ['外部触发', '系统内部', '处理步骤', '事件列表'], difficulty: 'medium' }
      ]
    },
    {
      id: 'bank',
      title: '银行存取款系统场景建模',
      chapter: '综合案例',
      examWeight: 81,
      mastery: 31,
      status: 'todo',
      type: '综合应用题',
      tags: ['综合', '易失分'],
      summary: '银行交易系统需要同时考虑客户、账户、交易、柜员/ATM 等实体，并描述存款、取款、查询、生成凭证等事件。',
      why: '这类题常用于考察学生能否从真实业务中抽象系统需求、事件列表和 ERD。',
      humanExplain: '可以把银行系统理解成围绕“账户余额变化”展开的系统。存款和取款不是简单按钮，而是需要验证账户、检查金额、更新余额、记录交易、输出凭证的一整套业务过程。',
      example: '取款时，客户提交账号和金额，系统先验证账户是否存在，再检查余额是否充足，随后扣减余额，生成交易记录，并输出取款成功信息或失败原因。',
      mistakes: ['只关注存款和取款，漏掉交易记录这一关键实体。', '没有把账户与客户区分开。一个客户可以有多个账户。', '忽略失败事件，例如余额不足、账号不存在。'],
      memoryMethods: [
        { name: '余额变化核心法', content: '看到银行题，先抓“账户、交易、金额、时间、结果”五个关键词。', appliesTo: ['case'] },
        { name: '成功失败双线法', content: '每个交易事件都想两条线：成功时做什么，失败时提示什么。', appliesTo: ['process'] }
      ],
      quiz: [
        { id: 'q-bank-1', type: '案例题', question: '银行取款事件的主要输入、处理和输出分别是什么？', answer: '输入包括账号、取款金额、身份验证信息；处理包括验证账户、检查余额、扣减余额、记录交易；输出包括取款成功凭证或失败原因。', keywords: ['账号', '金额', '验证账户', '检查余额', '扣减余额', '交易记录', '凭证'], difficulty: 'hard' },
        { id: 'q-bank-2', type: '判断题', question: '交易记录可以不作为实体，因为它只是系统处理过程。对还是错？', answer: '错。交易记录需要长期保存交易编号、时间、金额、类型、账户等信息，通常应作为实体。', keywords: ['错', '交易记录', '长期保存', '实体'], difficulty: 'easy' }
      ]
    },
    {
      id: 'normalization',
      title: '数据库范式与冗余消除',
      chapter: '数据库基础',
      examWeight: 76,
      mastery: 20,
      status: 'todo',
      type: '概念 + 判断 + 改错题',
      tags: ['中高频', '概念易混'],
      summary: '范式用于减少数据冗余和更新异常，核心是分析属性之间的依赖关系。',
      why: '考试常通过一张存在冗余的数据表，让学生指出问题并拆分成更合理的表。',
      humanExplain: '范式的本质不是机械背 1NF、2NF、3NF，而是避免“同一件事在很多地方重复写”。重复越多，修改时越容易出现不一致。',
      example: '如果学生选课表里每一行都重复课程名和教师名，当教师更换时就要改很多行，漏改一行就会产生数据不一致。拆成学生表、课程表、选课表后，信息会更清楚。',
      mistakes: ['只背定义，不会判断函数依赖。', '不知道为什么部分依赖和传递依赖会导致异常。', '拆表后忘记保留外键，导致表之间失去联系。'],
      memoryMethods: [
        { name: '异常倒推法', content: '看到重复数据，先问会不会插入异常、删除异常、修改异常，再倒推是否需要拆表。', appliesTo: ['concept', 'case'] },
        { name: '一事一表法', content: '学生的信息放学生表，课程的信息放课程表，选课这件事放选课表。', appliesTo: ['concept'] }
      ],
      quiz: [
        { id: 'q-normal-1', type: '简答题', question: '为什么学生选课表中反复保存课程名和教师名可能造成修改异常？', answer: '因为同一课程信息在多条记录中重复出现，一旦课程名或教师发生变化，需要修改多处，漏改就会造成数据不一致。', keywords: ['重复', '课程信息', '教师', '修改多处', '数据不一致'], difficulty: 'medium' },
        { id: 'q-normal-2', type: '填空题', question: '减少数据冗余和更新异常的重要数据库设计思想是____。', answer: '规范化或范式设计。', keywords: ['规范化', '范式'], difficulty: 'easy' }
      ]
    }
  ]
};

export const mockPapers: PaperDistribution[] = [
  { year: '2021', unitWeights: { erd: 28, events: 24, bank: 18, normalization: 15, other: 15 } },
  { year: '2022', unitWeights: { erd: 30, events: 20, bank: 20, normalization: 12, other: 18 } },
  { year: '2023', unitWeights: { erd: 26, events: 27, bank: 17, normalization: 20, other: 10 } },
  { year: '2024', unitWeights: { erd: 32, events: 22, bank: 21, normalization: 13, other: 12 } }
];
