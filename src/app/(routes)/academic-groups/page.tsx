"use client";

import { HeaderAcademicGroups } from "./components/HeaderAcademicGroups";
import { ClassGroupList } from "./components/ListClassGroup/ClassGroupList";
import { useAcademicGroup } from "./hook/useClassGroups";

export default function AcademicGroupPage() {
  const {
    groups,
    total,
    page,
    limit,
    setPage,
    isLoading,

    termInput,
    semester,
    subject,

    handleSearch,
    handleSemesterFilter,
    handleSubjectFilter,
    handleEdit,
    handleDetails,

    handleCreate,
  } = useAcademicGroup();

  return (
    <div className="">
      <HeaderAcademicGroups onCreateClick={handleCreate} />

      <div className="container mx-auto py-10">
        {" "}
        <ClassGroupList
          isLoading={isLoading}
          data={groups}
          total={total}
          page={page}
          limit={limit}
          onPageChange={setPage}
          termInput={termInput}
          semester={semester}
          subject={subject}
          onSearch={handleSearch}
          onSemesterChange={handleSemesterFilter}
          onSubjectChange={handleSubjectFilter}
          onEdit={handleEdit}
          onDetails={handleDetails}
        />
      </div>
    </div>
  );
}
