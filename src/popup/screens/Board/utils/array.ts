import {
  m_Discussion,
  m_Discussion_Redirect,
} from "../../../../models/m_Discussion";

//Assume arr1 and arr2 are sorted by descending createdAt and ascending id (if createdAt is the same)
//Deduplicate by id and merge by createdAt
export const mergeDiscussion = (
  arr1: (m_Discussion | m_Discussion_Redirect)[],
  arr2: (m_Discussion | m_Discussion_Redirect)[]
) => {
  console.log(arr1, arr2);
  const result: (m_Discussion | m_Discussion_Redirect)[] = [];
  let l1 = 0;
  let l2 = 0;

  //Loop through both arrays until one of them reaches the end
  while (l1 < arr1.length && l2 < arr2.length) {
    if (arr1[l1].createdAt > arr2[l2].createdAt) {
      result.push(arr1[l1]);
      l1++;
    } else if (arr2[l2].createdAt > arr1[l1].createdAt) {
      result.push(arr2[l2]);
      l2++;
    } else {
      if (arr1[l1].id === arr2[l2].id) {
        result.push(arr1[l1]);
        l1++;
        l2++;
      } else if ((arr1[l1].id ?? "") < (arr2[l2].id ?? "")) {
        result.push(arr1[l1]);
        l1++;
      } else {
        result.push(arr2[l2]);
        l2++;
      }
    }
  }

  //Push the rest of the array
  while (l1 < arr1.length) {
    result.push(arr1[l1]);
    l1++;
  }

  while (l2 < arr2.length) {
    result.push(arr2[l2]);
    l2++;
  }
  return result;
};
