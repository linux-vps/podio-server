import { config } from 'dotenv';
import { Podio, PodioOrganization, PodioSpace, PodioFile } from "./";
import { AddAppConfig } from "./types/podio_types";
import fs from "fs";

config();

const pd = new Podio({
  clientId: <string>process.env.PODIO_CLIENT_ID,
  clientSecret: <string>process.env.PODIO_CLIENT_SECRET,
  username: <string>process.env.PODIO_USER,
  password: <string>process.env.PODIO_PASSWORD
}, "./podio_token.json");

async function Main(): Promise<void> {
  // // Lấy tất cả items
  // const all_items = await pd.Items.FilterItems(30095263);
  // console.log("\n\nall items", all_items);

  // Lấy một item cụ thể
  const one_item = await pd.Items.GetItemByAppItemId(30095263, 2);
  console.log("\n\none item", one_item);
  // fs.writeFileSync("./item.json", JSON.stringify(one_item, null, 2));

  // // Tạo item mới
  // const newItem = {
  //   external_id: "bug-test-003",
  //   fields: [
  //     {
  //       external_id: "title",
  //       values: [{ value: "Test Bug Report" }]
  //     },
  //     {
  //       external_id: "description-of-problem",
  //       values: [{ value: "Đây là mô tả về vấn đề của bug" }]
  //     },
  //     {
  //       external_id: "steps-to-reproduce",
  //       values: [{ value: "1. Bước 1\n2. Bước 2\n3. Bước 3" }]
  //     },
  //     {
  //       external_id: "type-2",
  //       values: [{ value: 1 }]  // Giả sử 1 là ID của loại bug
  //     },
  //     {
  //       external_id: "status-2",
  //       values: [{ value: 1 }]  // Giả sử 1 là ID của trạng thái "New"
  //     },
  //     {
  //       external_id: "priority-2",
  //       values: [{ value: 2 }]  // Giả sử 2 là ID của mức độ ưu tiên "Medium"
  //     }
  //   ],
  //   tags: ["test", "sample"]
  // };

  // const created_item = await pd.Items.addItem(30095263, newItem);
  // console.log("\n\nCreated item:", created_item);

//   // Lấy danh sách organizations
//   const orgs = await pd.Organizations.getOrganizations();
//   console.log("Danh sách organizations:", orgs);

//   // Lấy thông tin chi tiết organization
//   const org = await pd.Organizations.getOrganization(3707687);
//   console.log("Thống tin chi tiết organization:", org);

//   // Tạo organization mới
//   const newOrg = await pd.Organizations.addOrganization({
//     name: "My Organization",
//     url: "https://myorg.com"
//   });

//   // Lấy danh sách spaces trong organization
//   const spaces = await pd.Organizations.getOrganizationSpaces(3707687);
//   console.log("Danh sách spaces trong organization:", spaces);



// // Tạo ứng dụng mới
// const appConfig: AddAppConfig = {
//   space_id: 10348265, // ID của workspace
//   config: {
//     name: "Bug Tracker",
//     item_name: "Bug",
//     description: "Ứng dụng theo dõi lỗi",
//     icon: "3.png",
//     fields: [
//       {
//         type: "text",
//         external_id: "title",
//         config: {
//           label: "Tiêu đề",
//           required: true
//         }
//       },
//       {
//         type: "text",
//         external_id: "description",
//         config: {
//           label: "Mô tả",
//           required: true
//         }
//       }
//     ]
//   }
// };

// // Tạo ứng dụng mới
// const newApp = await pd.Applications.addApp(appConfig);
// console.log("ID ứng dụng mới:", newApp.app_id);

// // Lấy thông tin ứng dụng
// const app = await pd.Applications.getApp(newApp.app_id);
// console.log("Thông tin ứng dụng:", app);

// // Cập nhật ứng dụng
// await pd.Applications.updateApp(newApp.app_id, {
//   config: {
//     ...appConfig.config,
//     description: "Mô tả mới cho ứng dụng"
//   }
// });

// // Lấy danh sách ứng dụng trong workspace
// const apps = await pd.Applications.getApps(appConfig.space_id);
// console.log("Danh sách ứng dụng:", apps);






// async function Main(): Promise<void> {
//   try {
//     const tempFilePath = "./thử nghiệm.txt";
//     fs.writeFileSync(tempFilePath, "Đây là nội dung file test");

//     console.log("1. Upload file lên Podio");
//     const uploadResult = await pd.Files.uploadFile(tempFilePath, "test.txt");
//     console.log("uploaded:", uploadResult);

//     // Lấy ID của một item attach file
//     console.log("\n2. Lấy thông tin một item để test attach file");
//     const items = await pd.Items.FilterItems(30095263);
//     if (items.items.length > 0) {
//       const itemId = items.items[0].item_id;
//       console.log("✅ Item ID để test:", itemId);

//       console.log("\n3. Attach file vào item");
//       const attachResult = await pd.Files.attachFile(uploadResult.file_id, "item", itemId);
//       console.log("attached:", attachResult);

//       console.log("\n4. Lấy danh sách files của item");
//       const files = await pd.Files.getFiles("item", itemId);
//       console.log("✅ Danh sách files:", files);

//       console.log("\n5. Cập nhật mô tả cho file");
//       await pd.Files.updateFile(uploadResult.file_id, "Đây là file test được cập nhật mô tả");
//       console.log("updated");

//       console.log("\n6. Xóa file");
//       await pd.Files.deleteFile(uploadResult.file_id);
//       console.log("deleted");
//     }

//     // Xóa file sau khi xong
//     fs.unlinkSync(tempFilePath);
//     console.log("deleted temp file");
//   } catch (error) {
//     console.error("Có lỗi xảy ra:", error);
//   }

// }





}

Main();
