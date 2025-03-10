---
id: asset-management
title: Art Asset Management Platform
chineseTitle: 美术资产管理平台
description: An art asset management platform with multi-dimensional tagging and an intelligent approval mechanism can shorten the time for resource search, reduce the rate of version conflicts.
chineseDescription: 具有通过多维度标签和智能审批机制的美术资产管理平台，可以缩短资源查找时间，降低版本冲突率，显著提升了美术部门的工作效率和资源管理质量。
tags: ["Internal","Game", "Efficiency","Tool"]
imageUrl: "/images/projects/asset-management/cover.jpg"
# liveUrl: ""
# githubUrl: ""
category: "web"
featured: false
date: 2019-02-20
# 新增项目背景信息
status: "completed"
chineseStatus: "已完成"
year: "2019"
duration: "6 months"
chineseDuration: "6 个月"
client: "Tap4Fun"
chineseClient: "Tap4Fun"
categoryLabel: "Efficiency Tool"
chineseCategoryLabel: "效率工具"
team:
  - name: "Wannz"
    role: "Product Manager"
    chineseRole: "产品经理"
---

# Tap4Fun: Construction and Optimization of the Art Asset Management System

## Project Background
As a leading company in the domestic SLG gaming sector, Tap4Fun faced significant challenges in managing art assets during game development. At that time, existing asset management systems on the market could not meet the unique needs of SLG games, which required high-frequency iteration and parallel management of multiple versions. This led to an asset search efficiency of less than 40% and frequent version conflicts, resulting in over 200 hours of wasted labor per week due to asset-related issues. To break this deadlock, we initiated an in-house R&D project for an art asset management system, aiming to build a resource management hub that supports cross-department collaboration and full lifecycle control.

## Core Challenges
1. **Complex Cross-Department Collaboration Processes**: The design, development, and publishing departments have different usage scenarios and requirements for art assets, necessitating fine-grained permission management and efficient approval workflows.
2. **High Difficulty in Version Control**: The rapid iteration of art assets, with over 500 changes per day, demands that the system has second-level version traceability and the ability to manage multiple version branches independently.
3. **Performance Challenges in Cross-Platform Access**: Client tools and web interfaces need seamless collaboration, ensuring a loading speed of less than 2 seconds when handling GB-level materials.
4. **Compatibility with Legacy Systems**: Data from existing tools like SVN and Perforce needs to be migrated while retaining access rights to historical versions.

## Solutions and Innovations
#### 1. Full-Process Asset Management System Construction
- **Multi-Dimensional Tagging System**: A four-dimensional tagging system of "project - role - type - status" was adopted, increasing resource search efficiency by 70%. For example, designers can quickly locate the required assets through tags like "SLG - character concept art - final version".
- **Compatibility with Legacy Project Migration**: For the old asset management system that the art team had previously built with SVN and their own server, we provided an import capability to offer comprehensive management of existing art assets.

#### 2. Optimization of Cross-Department Collaboration
- **Customized Role Workbenches**: A "My Favorites" feature was provided for designers to quickly access frequently used resources, and a "Global Monitoring Dashboard" was set up for department managers to keep track of resource usage in real-time.
- **Smart Approval Routing Mechanism**: Using a rule engine to automatically match approval processes, the approval cycle was shortened from 3 days to 8 hours. For example, character model assets would automatically be routed to the lead artist and technical artist for dual review.

## Key Achievements
1. **Significant Efficiency Improvement**: Asset maintenance and update time was reduced to within 10 minutes, and the average daily output of the art department increased by 35%.
2. **Effective Quality Assurance**: The version conflict rate dropped to single digits, and online incidents caused by asset issues were completely eliminated.
3. **Industry Recognition**: The system was integrated into the art department's common tools, supporting the development of multiple SLG games.

## Personal Reflections and Growth
#### 1. In-Depth Demand Insights
- **Problem**: Other members of the product team believed that the art department's needs were pseudo-demands and maintained a negative attitude throughout the project.
- **Improvement**: I worked with the art team to streamline the operation process and designed and implemented convenient features such as "one-click submission" and "drag-and-drop upload" in the requirements, which were highly praised by the art department after going live.

#### 2. Business and Management Challenges
- **Challenge**: The product team was fragmented into small groups, unable to complete project planning and implementation on schedule, posing delivery risks.
- **Lesson Learned**: Found a balance between technical ideals and business needs, and used a "core functionality first + progressive refactoring" strategy to persuade the development team to provide assistance.

### 3. Breakthrough in Cross-Department Collaboration
- **Innovation**: As the only communicator in the project, I collected representatives from each subgroup under the art department to confirm the needs for art asset management and jointly established asset management standards.

## Conclusion
This project has profoundly taught me that an excellent art asset management system is not just a tool but a bridge connecting creativity and engineering. By adopting a "start with the end in mind" design philosophy and working backward from the core scenarios of art creation, we successfully built an efficient system that meets both creative and engineering needs.

Of course, this project also helped me become familiar with the full process of defining IT project requirements and implementation within a game company, as well as the complexity and challenges of team management.

(Note: The data involved in this article has been desensitized or obfuscated, and some technical details have not been disclosed due to confidentiality agreements)
<div class="content-zh" data-language="zh">

# Tap4Fun：美术资产管理系统的构建与优化
## 项目背景
作为国内SLG游戏领域的领军企业，Tap4Fun在游戏开发过程中面临着美术资源管理的严峻挑战。当时，市面上现有的资产管理系统难以契合SLG游戏高频率迭代、多版本并行的独特需求，导致美术资源的查找效率不足40%，版本冲突问题频发，每周因资源问题造成的工时浪费超过200小时。为了打破这一困境，我们启动了美术资产管理系统的自研项目，致力于构建一个能够支持跨部门协作、实现全生命周期管控的资源管理中枢。

## 核心挑战
1. **跨部门协作的复杂流程**：设计、开发、发行这三个部门对美术资源有着不同的使用场景和需求，需要对权限进行精细划分，同时要确保审批流程的高效流转。
2. **版本控制的高难度**：美术资源的迭代速度极快，每天的变更量超过500个，这就要求系统具备秒级的版本追溯能力，并且要实现多版本分支的独立管理。
3. **跨平台访问的性能难题**：客户端工具和网页端需要实现无缝协同，在处理GB级的素材时，要保证加载速度低于2秒。
4. **与遗留系统的兼容问题**：需要将现有的SVN、Perforce等工具的数据进行迁移，同时还要保留历史版本的查阅权限。

## 解决方案与创新
#### 1. 全流程资产管理体系的搭建
- **多维度标签系统**：采用“项目 - 角色 - 类型 - 状态”四维标签体系，使资源的检索效率提高了70%。例如，设计师可以通过“SLG - 角色原画 - 最终版”这样的标签快速找到所需资源。
- **兼容老项目迁移**：对于美术团队前期通过SVN与自有服务器搭建的老资源管理系统提供导入能力，可对已有美术资源提供完善的管理能力。

#### 2. 跨部门协作的优化
- **角色工作台的定制**：为设计师提供了“我的收藏夹”功能，方便他们快速访问常用资源；为部门经理设置了“全局监控看板”，实时掌握资源的使用情况。
- **智能审批路由机制**：利用规则引擎自动匹配审批流程，将审批周期从3天缩短至8小时。例如，角色模型的资源会自动流转给主美和技术美术进行双重审核。

## 关键成果
1. **效率的显著提升**：资源维护更新时间下降至10分钟内，美术部门的人均日产出提高了35%。
2. **质量的有效保障**：版本冲突率下降至个位数，因资源问题导致的线上事故实现了清零。
3. **行业的认可**：该系统被纳入美术部门公用工具，支撑了多款SLG游戏的研发工作。

## 个人反思与提升
#### 1. 需求洞察的深入
- **问题**：产品团队的其他同事认为美术部门需求属于伪需求，在项目全过程中保持负面态度。
- **改进**：我与美术团队共同梳理了操作流程，在需求中设计并实现了“一键提交”“拖拽上传”等便捷功能，需求上线后获得美术部门的一致好评。

#### 2. 业务与管理的挑战
- **挑战**：产品团队内部小团队林立，无法按进度要求有效完成项目规划与实现，项目存在交付风险。
- **教训**：在技术理想和业务需求之间找到平衡点，采用“核心功能优先 + 渐进式重构”的策略说服研发团队提供帮助。

### 3. 跨部门协作的突破
- **创新**：作为项目中唯一的沟通者角色，我向美术部门下的各小组征集代表确认美术资产管理需求，共同制定资源管理规范。

## 结语
这个项目让我深刻认识到，一款优秀的美术资产管理系统，不仅仅是一个工具，更是连接创意与工程的桥梁。通过“以终为始”的设计思维，从美术创作的核心场景出发进行逆向推导，我们成功打造了一个既符合创作规律又能满足工程需求的高效系统。

当然，这个项目也帮我熟悉了解了游戏公司内部是定义 IT 项目的需求与实现的全流程，以及团队管理的复杂度与挑战点。

（注：本文涉及数据已脱敏或模糊处理，部分技术细节因保密协议未披露）
</div>