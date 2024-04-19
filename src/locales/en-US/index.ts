export default {
    introduce: {
        title: {
            main: "AnimationGPT",
            cover: "Game Motion",

            h1: {
                article: "Article",
                abstract: "Abstract",

                used: "Used",
                method: "Method",

                our: "Our",
                datasets: "Datasets",
            },

            h2: {
                datasetAnimation: "Dataset Animation Display",
                datasetAnnotation: "Dataset Annotation Method Display",
            },
        },

        prompt: "Prompt",
        exampleAnimation: "Example Animation",

        examples: [
            "The character's hands hang naturally at the sides of their body, their body's center of gravity slightly lowered, and they move slowly to the left.",
            "The character runs forward lightly.",
            "The character swiftly and lightly slides forward, becoming invisible during the process, with agile and clean movements, smoothly and fluently, feeling light and airy.",
            "The character rolls forward lightly and quickly gets up.",
            "The character rolls to the left side lightly and quickly gets up.",
            "The character is hit, their body goes into large stagger, and they get up at a moderate speed. They stagger in panic, leaning backward, while swinging their right arm in the air.",
            "The character performs a roll attack with a single-handed weapon in their right hand. It is straightforward and powerful. During the half-crouched running motion, the character swings the weapon from left to right.",
            "The character holds a greatsword or ultra greatsword in their right hand and performs a charged heavy attack. They squat halfway, lean slightly to the right side with their upper body, and then swing the sword forward. Finally, they return to the original standing posture.",
            "The character performs a light attack with a thrusting sword held in the left hand. They elegantly perform a flourish with their right hand before thrusting it forward, taking light steps forward. Then, they return to their stance.",
            "The character wields a curved sword and a large curved sword in each hand, and swings the swords in rotation before returning to a standing posture.",
            "The character holds a katana in their right hand, runs quickly and charges, then uses a direct and powerful attack to thrust forward, and finally returns to a standing posture.",
            "The character uses dual-wielding katanas to perform a technique that deflects attacks. They heavily lean to the left side, crouch down, and gather strength. Then, they lunge forward with their right foot and stab with their right hand, before returning to their original stance.",
            "The character wields an axe in their right hand and performs a jumping attack. They jump up, and as they land, they swing the axe forward with their right hand before returning to a standing position.",
            "The character dual wields axes and performs a quick strike, swiftly twisting their waist to the right, stepping forward with their right leg, and slashing downward diagonally with both hands.",
            "The character wields a hammer and uses a special attack, displaying a heavy sense of power. They rotate to the left at a steady pace, spin a full circle, then bring the hammer down on the ground, and finally carry it on their right shoulder.",
            "The character dual wields halberds and charges a powerful strike. They firmly twist their waist to the side, step forward with their right leg, hold the weapons with both hands, gather strength from the left rear, and then swing in two consecutive circles.",
            "The character utilizes a technique with curved swords and great curved swords, firmly carries the weapons on their shoulder, rotates to the left, counterclockwise almost one and a half circles, and swings the weapons.",
            "The character is knocked backward, falling on their back, then slowly gets up and stands upright.",
            "The character leans to the right, twists their waist, sprints forward quickly, and firmly grips the knives with both hands. They swiftly swing the blades upwards towards the right.",
            "The character holds a wedge-shaped weapon with both hands, raising it high above their head. They then take a lunge position with their right leg forward and left leg behind, and swing the weapon downwards.",
        ],

        content: {
            abstract: `As the field of artificial intelligence rapidly progresses, the demand for high-quality, stylized motion datasets is increasingly urgent. Currently, the academic community predominantly relies on an open-source motion dataset, HumanML3D, created two years ago, containing 14.6k motions. The limited number and homogenized lifestyle-like style of these motions greatly constrain the depth and breadth of research. To address this issue, we independently produced and open-sourced a new, meticulously annotated stylized combat motion dataset, CombatMotion Dataset (referred to as "CM Dataset"), featuring 14.8k motions. \n\nThrough comprehensive comparisons of recent scientific findings and experimental training with the new dataset, we concluded that the MotionGPT framework excels in semantic understanding and consistency. This unified motion-language framework compresses raw motion data into discrete motion tokens using a Vector Quantised-Variational AutoEncoder (VQ-VAE) and employs a motion-aware language model to learn the relationships between these motion tokens and natural language. \n\nLeveraging the MotionGPT (referred to as "MGPT") framework and CM Dataset, we successfully trained a high-quality combat motion text-to-motion model--AnimationGPT (referred to as "AGPT") and developed a motion redirection script in Maya that converts the widely used academic SMPL skeleton into the industrially prevalent BVH format. \n\nOverall, we established a replicable workflow standard including data extraction, annotation, motion redirection, model training, inference, and integration with commercial engines. This breakthrough not only lays a solid foundation for enriching motion datasets and deepening research but also paves the way for the future development and commercial application of motion generation technologies. \n\nWe hope this work will inspire more researchers, developers, and enterprises to explore this underutilized field and jointly advance the practical application of artificial intelligence and human motion generation.`,
            method: `To involve large-scale language data and models in motion generation tasks, we utilize a unified motion-language framework named MotionGPT. Specifically, MotionGPT employs discrete vector quantization of human motion and converts 3D motions into motion tokens, akin to the generation process of word tokens. Based on this "motion vocabulary," we model both motion and text in a unified manner, treating human motion as a new foreign language. Through the model's inference, we "translate" natural human language into the most fitting sequences of human motions.`,
            datasets: `We initially extracted motion data primarily styled for combat from high-quality resources, detailing various motions extensively.\n\nTo standardize motion data, we selected the SMPL (Skinned Multi-Person Linear Model) skeleton as the base, a linearly composable general human skinning skeleton model. We redirected all motion data to the SMPL skeleton to ensure data consistency and reusability.\n\nDuring the motion data annotation process, we meticulously divided the data into eight categories including motion type, weapon type, attack type, direction, power descriptor, speed descriptor, fuzzy descriptor, and posture description sentences. Based on the planners' common expressions, we established a rich lexicon for the first seven categories and manually annotated them according to a mapping table, while also optimizing the expression of annotation content using natural language processing technology.\n\nThese efforts allowed us to create a combat-style motion dataset, CombatMotionRaw Dataset (CMR Dataset), containing 14.8k motions and an equal number of annotations. Through training feedback, we adjusted the size and content of the annotations multiple times, ultimately producing a refined dataset, CombatMotionProcessed Dataset (CMP Dataset), with 8.7k motions and 26.1k annotation texts.`,
            datasetAnnotation:
                "The diagram above outlines our annotation process. Initially, we fill in seven key descriptive words based on the characteristics of the animation, followed by writing posture description sentences. Subsequently, we use a large language model to integrate these elements into several complete natural language sentences. Finally, we select the sentence that best meets our requirements as the annotation result.",
        },
    },

    demo: {
        title: "Motion Generate",

        inputLang: "Input Language",
        inputPlaceHolder: "Please input text to generate motion...",
        refExample: "Reference Examples",

        clear: "Clear",
        generate: "Generate",

        download: "Download",

        tips: "Tips",
        tipsForCNInput:
            "This demo only supports English input now. Entering Chinese may lead to incorrect generation. Do you want to continue?",

        tipsForDemoNotOK: "Sorry, this demo is unavailable now.",

        tipsForOverridePrompt: "Do you want to override current prompt?",

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

        supportedWeapon:
            "Currently supported weapon motion modal types include: Dagger, Greatsword, Katana, Curved Sword, Axe, Spear, Hammer, Fist.",
    },

    msg: {
        generateSuccess: "Generate success",
        generateError: "Generate error",

        promptIsEmpty: "Please input prompt",
        motionNotGenerated: "Motion hasn't been Generated",
        // translateError: "Input in Chinese error, please use English.",

        notFound: "Sorry, request error",
    },

    btn: {
        yes: "Yes",
        no: "No",
        back: "Back",
    },
};
