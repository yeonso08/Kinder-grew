import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import Buttons from "../../components/Buttons";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { scheduledIdAtom, classIdAtom, timeAtom } from "../../atom/hostButtonAtom";

const Schedule = ({ hostParams }) => {

    const setScheduleId = useSetRecoilState(scheduledIdAtom);
    const scheduledId = useRecoilValue(scheduledIdAtom);
    const setTime = useSetRecoilState(timeAtom);

    const queryClient = useQueryClient();
    const { classroomId } = useParams();
    const navigate = useNavigate();


    const handleAttendanceButton = (id) => {
        setScheduleId(id);
        setTime("전체시간");
        navigate(`/host/${classroomId}/${scheduledId}/전체시간`, () => {
            queryClient.invalidateQueries(["getManageTimeSchedule", hostParams]);
        });
    };

    return (
        <StyledAttendanceButtonGroup>
            {scheduledId === "ENTER" ? (
                <StyledABBtn
                    onClick={() => handleAttendanceButton("ENTER")}>등원인원</StyledABBtn>
            ) : (
                <Buttons.AB
                    onClick={() => handleAttendanceButton("ENTER")}>등원인원</Buttons.AB>
            )}
            {scheduledId === "EXIT" ? (
                <StyledABBtn
                    onClick={() => handleAttendanceButton("EXIT")}>하원인원</StyledABBtn>
            ) : (
                <Buttons.AB
                    onClick={() => handleAttendanceButton("EXIT")}>하원인원</Buttons.AB>
            )}
        </StyledAttendanceButtonGroup>
    );
};

export default Schedule;

const StyledAttendanceButtonGroup = styled.div`
    padding-top: 64px;
    gap: 10px;
`;
const StyledABBtn = styled(Buttons.AB)`
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.green_darker};
`;