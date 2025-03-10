---
id: ai-platform
title: AI Platform
chineseTitle: AI 中台
description: Design core functional modules, integrate internal resources, quickly fill in the AI capability gap, successfully launch OCR and image classification functions.
chineseDescription: 设计核心功能模块，整合内部资源，快速填补AI能力差距，成功推出OCR和图像分类功能。
tags: ["Business","Platform", "AI","Tool"]
imageUrl: "/images/projects/ai-platform/cover.jpg"
# liveUrl: ""
# githubUrl: ""
category: "web"
featured: false
date: 2019-10-20
# 新增项目背景信息
status: "completed"
chineseStatus: "已完成"
year: "2019"
duration: "6 months"
chineseDuration: "6 个月"
client: "Ghostcloud"
chineseClient: "精灵云"
categoryLabel: "AI Tool"
chineseCategoryLabel: "AI工具"
team:
  - name: "Wannz"
    role: "Product Manager&Project Manager"
    chineseRole: "产品经理&项目经理"
---

# UNI Cloud: Summary of Resource Integration and Scenario based Implementation Practice

As a product manager, I led the design of the core functional modules of the UNI Cloud AI middleware. By integrating internal APIs and computing resources, I quickly addressed the AI capability gaps in text and image recognition, ultimately achieving the benchmark launch of products comparable to those of Alibaba Cloud and Tencent Cloud. Below is a genuine summary based on the project practice:

## Project Background and Strategic Positioning

UNI Cloud faced challenges of fragmented AI capabilities and insufficient scenario coverage in the AI field, urgently needing to build a cloud service product comparable to Alibaba Cloud's Visual AI and Tencent Cloud's AI Open Platform. As the project manager and product manager, my core objectives were:

- Capability enhancement: Launch core functions such as OCR and image classification within the set period.
- Resource reuse: Quickly realize product capability invocation and implementation by calling internal APIs and computing resources.
- Scenario specialization: Focus on vertical fields such as finance and government affairs, providing scenario-based solutions like invoice recognition and document OCR.

## Core Contributions of the Product Manager

### 1. Technical Resource Assessment and Cooperation Model Design

- API capability research: Evaluate the performance of internal AI API interfaces (e.g., OCR response time, recognition accuracy rate), and establish a "demand pool - scheduling table" mechanism within the team to ensure that new APIs prioritize meeting business scenarios.

### 2. Requirement Alignment and Process Optimization

- Scenario-based requirement decomposition: Determine invoice recognition and document OCR as the first batch of functions to go live. Define "field mapping specifications" to unify the data format of different business systems (e.g., retain two decimal places for amounts).
- Cross-department collaboration mechanism: Establish the role of "technology - business translator" to convert customer needs into API invocation parameters (e.g., "automatically distinguish the front and back of ID cards" is transformed into image orientation detection parameters).

### Functional Modules and Business Value

| Module       | Internal Technical Resources          | Key Actions of the Product Manager                          | Business Value                                 |
|--------------|---------------------------------------|------------------------------------------------------------|-----------------------------------------------|
| Invoice Recognition | Invoice Recognition OCR API         | Define field mapping rules, exception handling logic            | Processing efficiency increased by 5 times     |
| Document OCR    | Self-developed ID Card Recognition API | Design multi-document mixed recognition strategy, re-entry process | Support for 20+ document types, accuracy rate over 90% |
| Image Classification | Internal Model        | Determine model fine-tuning parameters, deployment node configuration | Product classification accuracy rate of 96%    |

## Project Outcomes and Data Validation

- Technical launch: Timely completion of the launch of 2 AI capabilities and their publication on the UNI Cloud platform.

### Challenges and Solutions

- Inefficient cross-department collaboration: Long-term inability to quickly make decisions on requirements from the client side, resulting in significant waiting and modification costs in the project, which indirectly affected the project's fund collection.

### Industry Insights and Future Directions

- Product Manager's Mindset as a Resource Integrator: Transition from a "function designer" to an "ecosystem architect," creating value by connecting internal APIs with external scenarios.

## Conclusion

This experience has profoundly taught me that in the AI cloud service market dominated by giants, the core value of a product manager lies in "connection": connecting internal technical resources with external business scenarios and linking customer needs with commercialization paths. Through the full-chain design of "resource assessment - requirement alignment - customer success," we not only achieved technological breakthroughs but also established competitive barriers in vertical fields such as finance and government affairs.

(Note: The data involved in this article has been desensitized or obfuscated, and some technical details have not been disclosed due to confidentiality agreements)
<div class="content-zh" data-language="zh">

# 紫光云 AI 中台：资源整合与场景化落地实践总结
作为产品经理，我主导设计了紫光云 AI 中台的核心功能模块，通过整合内部 API 与算力资源，快速补足文字识别、图像识别等 AI 能力短板，最终实现与阿里云、腾讯云同类型产品的对标上线。以下是基于项目实践的真实总结：

## 项目背景与战略定位
紫光云在 AI 领域面临技术能力碎片化与场景覆盖不足的挑战，亟需构建对标阿里云视觉 AI、腾讯云 AI 开放平台的云服务产品。作为项目经理兼产品经理，我的核心目标是：

- 能力补足：按期内上线OCR、图像分类等核心功能。
- 资源复用：通过调用内部API与算力资源，快速完成产品能力调用与实现。
- 场景深耕：聚焦金融、政务等垂直领域，提供发票识别、证件OCR等场景化解决方案。

## 产品经理的核心贡献
### 1. 技术资源评估与合作模式设计
- API能力调研：评估内部AI API接口的性能（如OCR响应时间、识别准确率），在团队中建立「需求池 - 排期表」机制，确保新API优先满足业务场景。

### 2. 需求对齐与流程优化
- 场景化需求拆解：确定发票识别、证件OCR为首批上线功能。定义「字段映射规范」，统一不同业务系统的数据格式（如金额保留两位小数）。
- 跨部门协作机制：建立「技术 - 业务翻译官」角色，将客户需求转化为API调用参数（如“自动区分身份证正反面”转化为图像方向检测参数）。

### 功能模块与业务价值
| 模块       | 内部技术资源          | 产品经理关键动作                          | 业务价值                                 |
|------------|-----------------------|-------------------------------------------|------------------------------------------|
| 发票识别   | 发票识别OCR API         | 定义字段映射规则、异常处理逻辑            | 处理效率提升5倍         |
| 证件OCR    | 自研身份证识别API      | 设计多证件混合识别策略、补录流程          | 支持20+证件类型，准确率超过 90%           |
| 图像分类   | 内部模型        | 确定模型微调参数、部署节点配置            | 商品分类准确率96%    |

## 项目成果与数据验证
- 技术上线：按时完成2个AI 能力上线，并发布在紫光云平台中。

### 挑战与解决方案
- 跨部门协作低效：来自甲方的需求长期无法快速决策，项目中存在大量等待与修改成本，也间接影响了项目的资金收拢。

### 行业洞察与未来方向
- 资源整合者的产品经理思维：从「功能设计者」转型为「生态架构师」，通过内部API与外部场景的连接创造价值。

## 结语
这段经历让我深刻认识到，在巨头林立的AI云服务市场，产品经理的核心价值在于「连接」：连接内部技术资源与外部业务场景，连接客户需求与商业化路径。通过「资源评估 - 需求对齐 - 客户成功」的全链路设计，我们不仅实现了技术突破，更在金融、政务等垂直领域建立了竞争壁垒。

（注：本文涉及数据已脱敏或模糊处理，部分技术细节因保密协议未披露）
</div>