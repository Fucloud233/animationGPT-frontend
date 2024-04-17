export default {
    introduce: {
        mainTitle: "AnimationGPT 动作大模型",
        coverTitle: "游戏动作",

        prompt: "提示词",

        examples: [
            "角色双手自然下垂于身体两侧，身体重心稍微下压，向左缓慢移动。",
            "角色轻盈地向前跑动。",
            "角色轻盈地向前方滑步，过程中隐身，动作迅捷干净利落，流畅连贯，感觉轻飘飘的。",
            "角色轻盈地向前方翻滚，快速地起身。",
            "角色轻盈地向左边翻滚，快速地起身。",
            "角色受击，身体大硬直，均速起身，惊慌失措地身体失衡向后退，右手挥舞在空中。",
            "角色借助右手初始形态进行单持翻滚攻击，直截了当而有力量感的，双腿半蹲向前跑动的过程中，右手从左向右挥击。",
            "角色右手持大剑或特大剑，蓄力重击。角色双腿半蹲，上半身微微向右侧侧身，紧接着向前劈砍。最后回到原始站立姿势。",
            "角色左手持刺剑进行轻击，轻盈地右手挽一个刀花后向前刺击，同时向前碎步，随后恢复站姿。",
            "角色双手各持曲剑和大曲剑，在回旋挥刀后恢复站姿。",
            "角色右手持太刀，快速奔跑并蓄力，然后使用直截了当的力量感向前刺击，最后恢复站姿。",
            "角色用双持太刀进行战技弹反，沉重地向左侧身蓄力并下蹲，然后右脚前跨同时右手上刺，最后恢复站姿。",
            "角色右手持斧，以跳跃的方式进行攻击。角色跃起，同时落地时右手向前劈砍，然后起身恢复站姿。",
            "角色双持斧头进行轻击，以较迅捷的速度扭腰向右，右腿向前迈步，双手斜向下挥砍。",
            "角色持槌使用战技，具有沉重的力量感，匀速地向左转身旋转一圈，然后顺势将武器砸向地面，最后将武器扛在右肩。",
            "角色双持戟进行蓄力重击，扎实地侧身扭腰向左，右腿向前迈步，双手共握武器，从左后蓄力，然后向前连续挥两圈。",
            "角色使用曲剑和大曲剑进行战技，扎实的将武器扛在肩膀上，人物向左转身，逆时针旋转一周半，武器顺势挥砍。",
            "角色全身向后被击飞，后仰在地，并缓慢地起身直立。",
            "角色向右倾身扭腰，向前快速奔跑，双手稳握刀具，迅速向右上方挥刀。",
            "角色双手握着楔丸，高举在头顶，右腿在前左腿在后扎马步，然后向下挥砍。\t",
        ],

        subTitle: {
            article: "文章",
            abstract: "摘要",

            our: "我们的",
            method: "方法",
            datasets: "数据集",
        },

        content: {
            abstract: `随着人工智能领域的迅速发展，对于高质量、风格化的动作数据集的需求日益增长。目前，学术界普遍主要使用的只有一个两年前制作的包含14.6k动作的开源动作数据集HumanML3D 。由于动作数量稀少、风格单一化生活化，这极大限制了研究的深度与广度。为了解决这一问题，我们独立制作并开源了一个全新的、精心标注的、有14.8k动作的风格化战斗动作数据集CombatMotion Dataset(简称"CM数据集")。\n\n传统上，描述一个战斗动作是非常困难且模糊的工作，这在模型训练和自动化生成中会导致语义理解方面的不一致性 。为了克服这一挑战，我们通过规范标准，划分出八大类战斗动作描述维度，并通过逐类建立丰富词库的方式，提高了标注效率和一致性。\n\n通过对近期各类科研成果的综合比较和新数据集的尝试性训练，我们得到结论，MotionGPT(简称"MPGT")框架 在语义理解和一致性方面表现最佳。这是一种统一的动作-语言框架，其核心思路是，将原始的运动数据通过向量量化的自编码器(VQ-VAE)压缩成离散的动作词元(Token)，然后利用动作感知语言模型(motion-aware language model)去学习这些动作词元与自然语言之间的关系。\n\n基于MotionGPT框架和CM数据集，我们成功训练出了一个能够生成高质量战斗动作的文本-动作模型——AnimationGPT，并撰写了基于Maya的动作重定向脚本，将学术界常用的SMPL骨骼 转换为工业界广泛使用的BVH格式。\n\n综上，我们实现了一整套可复制的工作流规范，包括数据提取、数据标注、动作重定向、训练模型、推理和接入商业引擎的全过程。这一突破不仅为运动数据集的丰富化和科研工作的拓宽和深入提供了坚实的基础，也为未来的动作生成技术的发展和商业应用开辟了新的道路。\n\n我们希望这项工作能激发更多的研究者、开发者和企业共同探索这一未充分挖掘的领域，共同推动人工智能和人类动作生成实用化的发展。`,
            method: `为了在动作生成任务中引入大规模语言数据和模型，我们借助了一个统一的动作-语言框架，名为MotionGPT。具体来说，MotionGPT采用人类运动的离散向量量化，并将3D动作转换为动作词元，类似于词语词元的生成过程。在这种“动作词汇”基础上，以统一的方式对动作和文本进行语言建模，将人类运动视为一种新的外语，借助模型的推理将人类的自然语言“翻译”成最贴切的人类动作序列。`,
            datasets: `我们首先从高质量作品资源中提取了主要为战斗风格的动作数据，这些数据详细记录了各种动作的信息。\n\n为统一动作数据的标准，我们选择了SMPL（Skinned Multi-Person Linear Model）骨骼作为基础，这是一个线性可叠加的通用人体蒙皮骨骼模型，并将所有动作数据重定向到SMPL骨骼，确保了数据的一致性和可复用性。\n\n在动作数据的标注过程中，我们详细划分了包括动作类型、武器类型、攻击类型、方位类型、力量感、速度感、模糊形容词和姿势描述句等八个字段。我们依据策划的常用表述为前七类字段建立了丰富的词库，并按照映射表进行人工标注，同时运用自然语言处理技术优化了标注内容的表达方式。\n\n这些努力使我们得以创建包含一个14.8k个动作及同等数量标注的战斗风格动作数据集——CombatMotionRaw Dataset（CMR Dataset）。在接受训练反馈后，我们对数据集大小和标注内容进行了多次调整，最终形成了含有8.7k个动作和26.1k标注文本的精制数据集CombatMotionProcessed Dataset（CMP Dataset）。`,
        },
    },

    demo: {
        title: "动作生成",

        inputLang: "输入语言",
        inputPlaceHolder: "请使用英文输入提示词以生成动作...",
        refExample: "参考示例",

        clear: "清除",
        generate: "立即生成",

        download: "下载",

        tips: "提示",
        tipsForCNInput: "目前本 Demo 仅支持英文输入，输入中文可能会导致生成结果错误，您确定要继续吗？",

        tipsForDemoNotOK: "抱歉，Demo 程序现在不可用。",

        tipsForOverridePrompt: "您确定要覆盖当前的提示词吗？",

        // 因为只能通过英文输入，所以此处仍使用英文示例
        examples: [
            "The character runs forward lightly.",
            "The character rolls forward lightly and quickly gets up.",
            "The character is hit, their body goes into large stagger, and they get up at a moderate speed. They stagger in panic, leaning backward, while swinging their right arm in the air.",
            "The character performs a roll attack with a single-handed weapon in their right hand. It is straightforward and powerful. During the half-crouched running motion, the character swings the weapon from left to right.",
            "The character holds a greatsword or ultra greatsword in their right hand and performs a charged heavy attack. They squat halfway, lean slightly to the right side with their upper body, and then swing the sword forward. Finally, they return to the original standing posture.",
            "The character wields a curved sword and a large curved sword in each hand, and swings the swords in rotation before returning to a standing posture.",
            "The character holds a katana in their right hand, runs quickly and charges, then uses a direct and powerful attack to thrust forward, and finally returns to a standing posture.",
            "The character wields an axe in their right hand and performs a jumping attack. They jump up, and as they land, they swing the axe forward with their right hand before returning to a standing position.",
        ],

        supportedWeapon: "目前可支持地武器动作模态类型： 匕首/大剑/太刀/曲剑/斧/载/锤/拳头",
    },

    msg: {
        generateSuccess: "生成成功",
        generateError: "生成失败",

        promptIsEmpty: "请输入提示词",
        motionNotGenerated: "动作尚未生成，请先生成",
        translateError: "暂时不能使用中文输入，请输入英文",

        notFound: "你找的页面走丢了~",
    },

    btn: {
        yes: "是",
        no: "否",
        back: "返回",
    },
};
