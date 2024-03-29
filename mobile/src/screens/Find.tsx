import { useState } from 'react';
import { Heading, VStack, useToast } from "native-base";
import { useNavigation } from '@react-navigation/native';

import { api } from '../services/api';

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const { navigate } = useNavigation();
  const toast = useToast();

  async function handleJoinPool() {
    try {
      setIsLoading(true);
      console.log('CODE: ' + code);

      if (!code.trim()) {
        setIsLoading(false);
        return toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      await api.post('/pools/join', { code });
      navigate('pools');

      setIsLoading(false);

      toast.show({
        title: 'Você entrou no bolão com sucesso.',
        placement: 'top',
        bgColor: 'green.500'
      });

    } catch (error: any) {
      setIsLoading(false);
      console.log(error);

      if (error.response?.data?.message === 'Pool not found.') {
        return toast.show({
          title: 'Bolão não encontrado',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      if (error.response?.data?.message === 'You alread joined this pool.') {
        return toast.show({
          title: 'Você já está nesse bolão',
          placement: 'top',
          bgColor: 'red.500'
        });
      }
    }
  }

  return (
    <VStack flex='1' bgColor='gray.900'>
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems='center'>
        <Heading fontFamily="heading" color="white" fontSize='xl' mb={8} textAlign='center'>
          Encontre um bolão através de{'\n'}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder='Qual o código do bolão?'
          autoCapitalize='characters'
          onChangeText={setCode}
        />

        <Button
          title='BUSCAR BOLÃO'
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}